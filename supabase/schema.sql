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

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'publishing_status'
  ) then
    create type public.publishing_status as enum ('draft', 'published');
  end if;
end
$$;

create table if not exists public.cms_profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  location text,
  summary text not null,
  hero_intro text not null,
  availability text not null,
  email text not null,
  github_url text not null,
  featured_label text not null,
  status public.publishing_status not null default 'draft',
  published_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.cms_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  headline text not null,
  summary text not null,
  role text not null,
  outcomes text not null,
  stack text[] not null default '{}',
  repository_url text,
  live_url text,
  cover_image_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status public.publishing_status not null default 'draft',
  published_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.cms_project_sections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.cms_projects(id) on delete cascade,
  section_key text not null,
  heading text not null,
  content text not null,
  sort_order integer not null default 0
);

create table if not exists public.cms_skill_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  status public.publishing_status not null default 'draft',
  published_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.cms_skill_items (
  id uuid primary key default gen_random_uuid(),
  skill_group_id uuid not null references public.cms_skill_groups(id) on delete cascade,
  label text not null,
  emphasis text,
  sort_order integer not null default 0
);

create table if not exists public.cms_experience_items (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  summary text not null,
  highlights text[] not null default '{}',
  sort_order integer not null default 0,
  status public.publishing_status not null default 'draft',
  published_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.save_cms_project(
  p_id uuid,
  p_slug text,
  p_title text,
  p_headline text,
  p_summary text,
  p_role text,
  p_outcomes text,
  p_stack text[],
  p_repository_url text,
  p_live_url text,
  p_cover_image_url text,
  p_featured boolean,
  p_sort_order integer,
  p_status public.publishing_status,
  p_published_at timestamptz,
  p_sections jsonb
)
returns uuid
language plpgsql
as $$
declare
  v_id uuid := coalesce(p_id, gen_random_uuid());
begin
  insert into public.cms_projects (
    id,
    slug,
    title,
    headline,
    summary,
    role,
    outcomes,
    stack,
    repository_url,
    live_url,
    cover_image_url,
    featured,
    sort_order,
    status,
    published_at
  )
  values (
    v_id,
    p_slug,
    p_title,
    p_headline,
    p_summary,
    p_role,
    p_outcomes,
    coalesce(p_stack, '{}'),
    p_repository_url,
    p_live_url,
    p_cover_image_url,
    coalesce(p_featured, false),
    coalesce(p_sort_order, 0),
    p_status,
    p_published_at
  )
  on conflict (id) do update set
    slug = excluded.slug,
    title = excluded.title,
    headline = excluded.headline,
    summary = excluded.summary,
    role = excluded.role,
    outcomes = excluded.outcomes,
    stack = excluded.stack,
    repository_url = excluded.repository_url,
    live_url = excluded.live_url,
    cover_image_url = excluded.cover_image_url,
    featured = excluded.featured,
    sort_order = excluded.sort_order,
    status = excluded.status,
    published_at = excluded.published_at;

  delete from public.cms_project_sections
  where project_id = v_id;

  insert into public.cms_project_sections (
    project_id,
    section_key,
    heading,
    content,
    sort_order
  )
  select
    v_id,
    section_key,
    heading,
    content,
    sort_order
  from jsonb_to_recordset(coalesce(p_sections, '[]'::jsonb)) as section(
    section_key text,
    heading text,
    content text,
    sort_order integer
  );

  return v_id;
end;
$$;

create or replace function public.save_cms_skill_group(
  p_id uuid,
  p_title text,
  p_description text,
  p_sort_order integer,
  p_status public.publishing_status,
  p_published_at timestamptz,
  p_items jsonb
)
returns uuid
language plpgsql
as $$
declare
  v_id uuid := coalesce(p_id, gen_random_uuid());
begin
  insert into public.cms_skill_groups (
    id,
    title,
    description,
    sort_order,
    status,
    published_at
  )
  values (
    v_id,
    p_title,
    p_description,
    coalesce(p_sort_order, 0),
    p_status,
    p_published_at
  )
  on conflict (id) do update set
    title = excluded.title,
    description = excluded.description,
    sort_order = excluded.sort_order,
    status = excluded.status,
    published_at = excluded.published_at;

  delete from public.cms_skill_items
  where skill_group_id = v_id;

  insert into public.cms_skill_items (
    skill_group_id,
    label,
    emphasis,
    sort_order
  )
  select
    v_id,
    label,
    emphasis,
    sort_order
  from jsonb_to_recordset(coalesce(p_items, '[]'::jsonb)) as item(
    label text,
    emphasis text,
    sort_order integer
  );

  return v_id;
end;
$$;

drop trigger if exists cms_profile_set_updated_at on public.cms_profile;
create trigger cms_profile_set_updated_at
before update on public.cms_profile
for each row
execute function public.set_updated_at();

drop trigger if exists cms_projects_set_updated_at on public.cms_projects;
create trigger cms_projects_set_updated_at
before update on public.cms_projects
for each row
execute function public.set_updated_at();

drop trigger if exists cms_skill_groups_set_updated_at on public.cms_skill_groups;
create trigger cms_skill_groups_set_updated_at
before update on public.cms_skill_groups
for each row
execute function public.set_updated_at();

drop trigger if exists cms_experience_items_set_updated_at on public.cms_experience_items;
create trigger cms_experience_items_set_updated_at
before update on public.cms_experience_items
for each row
execute function public.set_updated_at();

insert into public.cms_profile (
  id,
  name,
  title,
  location,
  summary,
  hero_intro,
  availability,
  email,
  github_url,
  featured_label,
  status,
  published_at,
  updated_at
)
select
  id,
  name,
  title,
  location,
  summary,
  summary,
  'Available for product engineering roles.',
  email,
  github_url,
  'Legacy portfolio content',
  'published',
  updated_at,
  updated_at
from public.portfolio_profile
where not exists (
  select 1
  from public.cms_profile
);

insert into public.cms_projects (
  id,
  slug,
  title,
  headline,
  summary,
  role,
  outcomes,
  stack,
  repository_url,
  live_url,
  cover_image_url,
  featured,
  sort_order,
  status,
  published_at,
  updated_at
)
select
  id,
  slug,
  title,
  description,
  description,
  'Legacy portfolio project',
  description,
  stack,
  repository_url,
  live_url,
  null,
  featured,
  sort_order,
  'published',
  updated_at,
  updated_at
from public.portfolio_projects
where not exists (
  select 1
  from public.cms_projects
  where cms_projects.id = portfolio_projects.id
);

insert into public.cms_project_sections (
  project_id,
  section_key,
  heading,
  content,
  sort_order
)
select
  id,
  'overview',
  'Overview',
  description,
  1
from public.portfolio_projects
where not exists (
  select 1
  from public.cms_project_sections
  where cms_project_sections.project_id = portfolio_projects.id
);

insert into public.cms_skill_groups (
  id,
  title,
  description,
  sort_order,
  status,
  published_at,
  updated_at
)
select
  id,
  title,
  'Imported from legacy portfolio content.',
  sort_order,
  'published',
  updated_at,
  updated_at
from public.portfolio_skill_groups
where not exists (
  select 1
  from public.cms_skill_groups
  where cms_skill_groups.id = portfolio_skill_groups.id
);

insert into public.cms_skill_items (
  skill_group_id,
  label,
  emphasis,
  sort_order
)
select
  group_row.id,
  item.label,
  null,
  item.ordinality
from public.portfolio_skill_groups as group_row
cross join lateral unnest(group_row.items) with ordinality as item(label, ordinality)
where not exists (
  select 1
  from public.cms_skill_items
  where cms_skill_items.skill_group_id = group_row.id
);

insert into public.cms_experience_items (
  id,
  role,
  company,
  period,
  summary,
  highlights,
  sort_order,
  status,
  published_at,
  updated_at
)
select
  id,
  role,
  company,
  period,
  summary,
  array[summary],
  sort_order,
  'published',
  updated_at,
  updated_at
from public.portfolio_experience_items
where not exists (
  select 1
  from public.cms_experience_items
  where cms_experience_items.id = portfolio_experience_items.id
);

alter table public.cms_profile enable row level security;
alter table public.cms_projects enable row level security;
alter table public.cms_project_sections enable row level security;
alter table public.cms_skill_groups enable row level security;
alter table public.cms_skill_items enable row level security;
alter table public.cms_experience_items enable row level security;

drop policy if exists "Public can read published cms profile" on public.cms_profile;
create policy "Public can read published cms profile"
on public.cms_profile
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read published cms projects" on public.cms_projects;
create policy "Public can read published cms projects"
on public.cms_projects
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read project sections for published projects" on public.cms_project_sections;
create policy "Public can read project sections for published projects"
on public.cms_project_sections
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.cms_projects
    where cms_projects.id = cms_project_sections.project_id
      and cms_projects.status = 'published'
  )
);

drop policy if exists "Public can read published skill groups" on public.cms_skill_groups;
create policy "Public can read published skill groups"
on public.cms_skill_groups
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read skill items for published groups" on public.cms_skill_items;
create policy "Public can read skill items for published groups"
on public.cms_skill_items
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.cms_skill_groups
    where cms_skill_groups.id = cms_skill_items.skill_group_id
      and cms_skill_groups.status = 'published'
  )
);

drop policy if exists "Public can read published experience items" on public.cms_experience_items;
create policy "Public can read published experience items"
on public.cms_experience_items
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Authenticated users can manage cms profile" on public.cms_profile;
create policy "Authenticated users can manage cms profile"
on public.cms_profile
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage cms projects" on public.cms_projects;
create policy "Authenticated users can manage cms projects"
on public.cms_projects
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage cms project sections" on public.cms_project_sections;
create policy "Authenticated users can manage cms project sections"
on public.cms_project_sections
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage cms skill groups" on public.cms_skill_groups;
create policy "Authenticated users can manage cms skill groups"
on public.cms_skill_groups
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage cms skill items" on public.cms_skill_items;
create policy "Authenticated users can manage cms skill items"
on public.cms_skill_items
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can manage cms experience items" on public.cms_experience_items;
create policy "Authenticated users can manage cms experience items"
on public.cms_experience_items
for all
to authenticated
using (true)
with check (true);
