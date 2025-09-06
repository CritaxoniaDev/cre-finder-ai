-- Create credit movements table to track all credit transactions
CREATE TYPE public.credit_movement_type AS ENUM ('subscription', 'purchase', 'bonus', 'refund', 'adjustment');

CREATE TABLE IF NOT EXISTS public.credit_transactions (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    transaction_type TEXT NOT NULL CHECK (
        transaction_type IN (
            'subscription',
            'purchase',
            'bonus',
            'refund',
            'adjustment'
        )
    ),
    credit_amount INTEGER NOT NULL, -- Positive for credits added, negative for adjustments
    description TEXT,
    reference_id TEXT, -- Could be payment ID, order ID, etc.
    expires_at TIMESTAMP WITH TIME ZONE, -- NULL for non-expiring credits
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON public.credit_transactions (user_id);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_expires_at ON public.credit_transactions (expires_at);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON public.credit_transactions (created_at);

-- Enable RLS
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for credit_transactions
CREATE POLICY "Users can view their own credit transactions" ON public.credit_transactions FOR
SELECT USING (auth.uid () = user_id);

CREATE POLICY "Service role can manage credit transactions" ON public.credit_transactions FOR ALL USING (auth.role () = 'service_role');

-- Create trigger for updated_at
CREATE TRIGGER credit_transactions_updated_at
BEFORE UPDATE ON public.credit_transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION public.calculate_user_credit_usage()
RETURNS TABLE (
    total_consumed INTEGER,
    total_available INTEGER,
    total_extra INTEGER,
    total_expiring_soon INTEGER,
    remaining_credits INTEGER
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_period_start TIMESTAMP WITH TIME ZONE;
    current_period_end TIMESTAMP WITH TIME ZONE;
    available_credits INTEGER := 0;
    extra_credits INTEGER := 0;
    expiring_soon_credits INTEGER := 0;
    consumed_credits INTEGER := 0;
BEGIN
    -- Set current period (monthly)
    current_period_start := date_trunc('month', now());
    current_period_end := (date_trunc('month', now()) + interval '1 month');
    
    -- Calculate available credits from all positive transactions (non-expired)
    SELECT 
        COALESCE(SUM(credit_amount), 0) INTO available_credits
    FROM 
        credit_transactions
    WHERE 
        user_id = auth.uid()
        AND (expires_at IS NULL OR expires_at > now())
        AND credit_amount > 0; -- Only count positive credit additions
    
    -- Calculate available extra credits (purchased credits, non-expired)
    SELECT 
        COALESCE(SUM(credit_amount), 0) INTO extra_credits
    FROM 
        credit_transactions
    WHERE 
        user_id = auth.uid()
        AND transaction_type = 'purchase'
        AND (expires_at IS NULL OR expires_at > now())
        AND credit_amount > 0;
    
    -- Calculate credits expiring in the next 7 days
    SELECT 
        COALESCE(SUM(credit_amount), 0) INTO expiring_soon_credits
    FROM 
        credit_transactions
    WHERE 
        user_id = auth.uid()
        AND expires_at IS NOT NULL
        AND expires_at > now()
        AND expires_at <= (now() + interval '7 days')
        AND credit_amount > 0;
    
    -- Calculate consumed credits from negative transactions in current period
    SELECT 
        COALESCE(ABS(SUM(credit_amount)), 0) INTO consumed_credits
    FROM 
        credit_transactions
    WHERE 
        user_id = auth.uid()
        AND credit_amount < 0 -- Only count negative transactions (consumption)
        AND created_at >= current_period_start
        AND created_at < current_period_end;
    
    -- Set return values
    total_consumed := consumed_credits;
    total_available := available_credits;
    total_extra := extra_credits;
    total_expiring_soon := expiring_soon_credits;
    remaining_credits := available_credits - consumed_credits;
    
    -- Return the results
    RETURN NEXT;
    RETURN;
END;
$$;

CREATE OR REPLACE FUNCTION public.consume_user_credits(
    credits_to_consume INTEGER DEFAULT 1
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    usage_data RECORD;
BEGIN
    -- Get current usage data
    SELECT * INTO usage_data
    FROM calculate_user_credit_usage();
    
    -- Check if user has enough remaining credits
    IF usage_data.remaining_credits < credits_to_consume THEN
        RETURN FALSE; -- Not enough credits
    END IF;
    
    -- Create a negative transaction to represent credit consumption
    INSERT INTO credit_transactions (
        user_id,
        transaction_type,
        credit_amount,
        description
    ) VALUES (
        auth.uid(),
        'adjustment',
        -credits_to_consume,
        'Credits consumed for search'
    );
    
    RETURN TRUE; -- Successfully consumed credits
END;
$$;

-- Grant execute permissions
GRANT
EXECUTE ON FUNCTION public.calculate_user_credit_usage () TO authenticated;

GRANT
EXECUTE ON FUNCTION public.consume_user_credits (INTEGER) TO authenticated;

-- Update function comments
COMMENT ON FUNCTION public.calculate_user_credit_usage IS 'Calculates a user''s credit usage based on credit transactions for the current billing period';

COMMENT ON FUNCTION public.consume_user_credits IS 'Consumes credits by creating a negative credit transaction';