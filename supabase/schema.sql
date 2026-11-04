-- YurLaps account dashboard schema
-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> Run.

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  nickname text not null default '',
  tts_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are viewable by owner" on public.profiles;
create policy "profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles are insertable by owner" on public.profiles;
create policy "profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles are updatable by owner" on public.profiles;
create policy "profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- Transponders
-- ---------------------------------------------------------------------------
create table if not exists public.transponders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  transponder_id text not null,
  rc_class text not null default '',
  rc_brand text not null default '',
  created_at timestamptz not null default now(),
  unique (transponder_id)
);

create index if not exists transponders_user_id_idx on public.transponders (user_id);

alter table public.transponders enable row level security;

drop policy if exists "transponders are viewable by owner" on public.transponders;
create policy "transponders are viewable by owner"
  on public.transponders for select
  using (auth.uid() = user_id);

drop policy if exists "transponders are insertable by owner" on public.transponders;
create policy "transponders are insertable by owner"
  on public.transponders for insert
  with check (auth.uid() = user_id);

drop policy if exists "transponders are updatable by owner" on public.transponders;
create policy "transponders are updatable by owner"
  on public.transponders for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "transponders are deletable by owner" on public.transponders;
create policy "transponders are deletable by owner"
  on public.transponders for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Timestamps and automatic profile creation
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Avatars storage bucket
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

do $$
begin
  update storage.buckets
  set public = true
  where id = 'avatars';
exception
  when insufficient_privilege then
    raise notice 'Could not set the avatars bucket to public. Set it manually in Storage settings.';
end;
$$;

drop policy if exists "avatar images are publicly readable" on storage.objects;
create policy "avatar images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "users can upload their own avatar" on storage.objects;
create policy "users can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "users can update their own avatar" on storage.objects;
create policy "users can update their own avatar"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "users can delete their own avatar" on storage.objects;
create policy "users can delete their own avatar"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
