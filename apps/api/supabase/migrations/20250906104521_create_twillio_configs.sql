create table public.twilio_configs (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid not null,
  account_sid text not null,
  auth_token text not null,
  phone_number text not null,
  messaging_service_sid text null,
  webhook_url text null,
  custom_message text null,
  is_active boolean null default true,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint twilio_configs_pkey primary key (id),
  constraint twilio_configs_user_id_key unique (user_id),
  constraint twilio_configs_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_twilio_configs_user_id on public.twilio_configs using btree (user_id) TABLESPACE pg_default;