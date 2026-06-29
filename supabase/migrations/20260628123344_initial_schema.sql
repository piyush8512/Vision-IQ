-- ============================================
-- Profiles Table
-- ============================================

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    created_at timestamptz not null default now()
);

comment on table public.profiles is 'Stores additional profile information for authenticated users.';

-- ============================================
-- Enable Row Level Security
-- ============================================

alter table public.profiles
enable row level security;

-- ============================================
-- RLS Policies
-- ============================================

create policy "Users can view their own profile"
on public.profiles
for select
using (
    auth.uid() = id
);

create policy "Users can insert their own profile"
on public.profiles
for insert
with check (
    auth.uid() = id
);

create policy "Users can update their own profile"
on public.profiles
for update
using (
    auth.uid() = id
);

create policy "Users can delete their own profile"
on public.profiles
for delete
using (
    auth.uid() = id
);

-- ============================================
-- Trigger Function
-- ============================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (
        id,
        full_name
    )
    values (
        new.id,
        coalesce(
            new.raw_user_meta_data ->> 'full_name',
            ''
        )
    );

    return new;
end;
$$;

-- ============================================
-- Trigger
-- ============================================

create trigger on_auth_user_created
after insert
on auth.users
for each row
execute procedure public.handle_new_user();