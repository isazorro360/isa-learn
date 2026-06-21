create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text default '',
  roles text[] not null default array['student'],
  created_at timestamptz not null default now()
);

create table if not exists public.past_questions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,
  year int not null,
  category text not null check (category in ('Past Question', 'Marking Scheme', 'Notes')),
  description text not null,
  file_name text not null,
  file_url text not null,
  storage_path text,
  uploaded_by text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id text not null,
  title text not null,
  subject text not null,
  category text not null,
  year int not null,
  description text not null,
  file_url text not null,
  file_name text not null,
  created_at timestamptz not null default now(),
  unique (user_id, resource_id)
);

alter table public.users enable row level security;
alter table public.past_questions enable row level security;
alter table public.bookmarks enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and ('admin' = any(roles) or email = 'admin@isaitech.com')
  );
$$;

drop policy if exists "Users can read own profile" on public.users;
create policy "Users can read own profile"
on public.users for select
using (auth.uid() = id or public.is_admin());

drop policy if exists "Users can create own profile" on public.users;
create policy "Users can create own profile"
on public.users for insert
with check (auth.uid() = id);

drop policy if exists "Users can update own non-admin profile" on public.users;
create policy "Users can update own non-admin profile"
on public.users for update
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

drop policy if exists "Anyone can read past questions" on public.past_questions;
create policy "Anyone can read past questions"
on public.past_questions for select
using (true);

drop policy if exists "Admins manage past questions" on public.past_questions;
create policy "Admins manage past questions"
on public.past_questions for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Users manage own bookmarks" on public.bookmarks;
create policy "Users manage own bookmarks"
on public.bookmarks for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('past-questions', 'past-questions', true)
on conflict (id) do update set public = true;

drop policy if exists "Anyone can read past question files" on storage.objects;
create policy "Anyone can read past question files"
on storage.objects for select
using (bucket_id = 'past-questions');

drop policy if exists "Admins upload past question files" on storage.objects;
create policy "Admins upload past question files"
on storage.objects for insert
with check (bucket_id = 'past-questions' and public.is_admin());

drop policy if exists "Admins update past question files" on storage.objects;
create policy "Admins update past question files"
on storage.objects for update
using (bucket_id = 'past-questions' and public.is_admin())
with check (bucket_id = 'past-questions' and public.is_admin());

drop policy if exists "Admins delete past question files" on storage.objects;
create policy "Admins delete past question files"
on storage.objects for delete
using (bucket_id = 'past-questions' and public.is_admin());
