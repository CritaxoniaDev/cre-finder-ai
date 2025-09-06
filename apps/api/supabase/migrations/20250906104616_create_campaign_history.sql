create table public.campaign_history (
  id uuid not null default gen_random_uuid (),
  property_id uuid not null,
  user_id uuid not null,
  sent_at timestamp with time zone null default now(),
  type character varying(20) null,
  status character varying(20) null,
  constraint campaign_history_pkey primary key (id),
  constraint campaign_history_property_id_fkey foreign KEY (property_id) references property_records (id)
) TABLESPACE pg_default;