-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).

-- Single-row table holding the whole invitation's editable content.
create table if not exists public.site_content (
  id integer primary key,
  data jsonb not null
);

-- RSVP responses from guests.
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  attending text not null default 'yes',
  guests integer not null default 1,
  message text default '',
  created_at timestamptz not null default now()
);

-- The app talks to Supabase with the service-role key from the server only,
-- so RLS can stay enabled with no public policies.
alter table public.site_content enable row level security;
alter table public.rsvps enable row level security;

-- Public bucket for uploaded photos.
insert into storage.buckets (id, name, public)
values ('invitation-photos', 'invitation-photos', true)
on conflict (id) do nothing;
