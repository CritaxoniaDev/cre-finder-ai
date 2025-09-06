create table public.vapi_configs (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid not null,
  api_key text not null,
  organization text null,
  assistant_id text not null,
  phone_number text null,
  webhook_url text null,
  custom_prompt text null,
  is_active boolean null default true,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint vapi_configs_pkey primary key (id),
  constraint vapi_configs_user_id_key unique (user_id),
  constraint vapi_configs_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
) tablespace pg_default;

create index if not exists idx_vapi_configs_user_id on public.vapi_configs using btree (user_id)