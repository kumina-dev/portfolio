create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.portfolio_profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  summary text not null,
  location text,
  github_url text not null,
  email text not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  stack text[] not null default '{}',
  repository_url text,
  live_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_skill_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  items text[] not null default '{}',
  sort_order integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_experience_items (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  summary text not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_roadmap_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists portfolio_profile_set_updated_at on public.portfolio_profile;
create trigger portfolio_profile_set_updated_at
before update on public.portfolio_profile
for each row
execute function public.set_updated_at();

drop trigger if exists portfolio_projects_set_updated_at on public.portfolio_projects;
create trigger portfolio_projects_set_updated_at
before update on public.portfolio_projects
for each row
execute function public.set_updated_at();

drop trigger if exists portfolio_skill_groups_set_updated_at on public.portfolio_skill_groups;
create trigger portfolio_skill_groups_set_updated_at
before update on public.portfolio_skill_groups
for each row
execute function public.set_updated_at();

drop trigger if exists portfolio_experience_items_set_updated_at on public.portfolio_experience_items;
create trigger portfolio_experience_items_set_updated_at
before update on public.portfolio_experience_items
for each row
execute function public.set_updated_at();

drop trigger if exists portfolio_roadmap_items_set_updated_at on public.portfolio_roadmap_items;
create trigger portfolio_roadmap_items_set_updated_at
before update on public.portfolio_roadmap_items
for each row
execute function public.set_updated_at();

alter table public.portfolio_profile enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_skill_groups enable row level security;
alter table public.portfolio_experience_items enable row level security;
alter table public.portfolio_roadmap_items enable row level security;

drop policy if exists "Public can read portfolio profile" on public.portfolio_profile;
create policy "Public can read portfolio profile"
on public.portfolio_profile
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read portfolio projects" on public.portfolio_projects;
create policy "Public can read portfolio projects"
on public.portfolio_projects
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read portfolio skill groups" on public.portfolio_skill_groups;
create policy "Public can read portfolio skill groups"
on public.portfolio_skill_groups
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read portfolio experience items" on public.portfolio_experience_items;
create policy "Public can read portfolio experience items"
on public.portfolio_experience_items
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can manage portfolio profile" on public.portfolio_profile;
create policy "Authenticated users can manage portfolio profile"
on public.portfolio_profile
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage portfolio projects" on public.portfolio_projects;
create policy "Authenticated users can manage portfolio projects"
on public.portfolio_projects
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage portfolio skill groups" on public.portfolio_skill_groups;
create policy "Authenticated users can manage portfolio skill groups"
on public.portfolio_skill_groups
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage portfolio experience items" on public.portfolio_experience_items;
create policy "Authenticated users can manage portfolio experience items"
on public.portfolio_experience_items
for all
to authenticated
using (true)
with check (true);
