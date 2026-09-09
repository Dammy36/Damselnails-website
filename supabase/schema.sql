-- Damsel Nails Studio — image management schema.
-- Run this whole file in the Supabase SQL editor. Safe to re-run: every
-- statement either uses IF NOT EXISTS or replaces/drops-then-creates first.

create extension if not exists "pgcrypto";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ─── site_images (one row per fixed image slot) ─────────────────────
create table if not exists site_images (
  key text primary key,
  url text,
  alt text,
  updated_at timestamptz not null default now()
);

drop trigger if exists set_site_images_updated_at on site_images;
create trigger set_site_images_updated_at
  before update on site_images
  for each row execute function set_updated_at();

alter table site_images enable row level security;

drop policy if exists "Public can read site_images" on site_images;
create policy "Public can read site_images"
  on site_images for select
  to anon
  using (true);

drop policy if exists "Authenticated full access to site_images" on site_images;
create policy "Authenticated full access to site_images"
  on site_images for all
  to authenticated
  using (true)
  with check (true);

-- ─── gallery_images (reorderable, addable/removable) ─────────────────
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt text default 'Damsel Nails Studio nail set',
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_gallery_images_updated_at on gallery_images;
create trigger set_gallery_images_updated_at
  before update on gallery_images
  for each row execute function set_updated_at();

alter table gallery_images enable row level security;

drop policy if exists "Public can read published gallery_images" on gallery_images;
create policy "Public can read published gallery_images"
  on gallery_images for select
  to anon
  using (published = true);

drop policy if exists "Authenticated full access to gallery_images" on gallery_images;
create policy "Authenticated full access to gallery_images"
  on gallery_images for all
  to authenticated
  using (true)
  with check (true);

-- ─── storage ──────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('damsel-images', 'damsel-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view damsel-images" on storage.objects;
create policy "Public can view damsel-images"
  on storage.objects for select
  to anon
  using (bucket_id = 'damsel-images');

drop policy if exists "Authenticated can upload damsel-images" on storage.objects;
create policy "Authenticated can upload damsel-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'damsel-images');

drop policy if exists "Authenticated can update damsel-images" on storage.objects;
create policy "Authenticated can update damsel-images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'damsel-images');

drop policy if exists "Authenticated can delete damsel-images" on storage.objects;
create policy "Authenticated can delete damsel-images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'damsel-images');
