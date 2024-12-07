-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing
Drop Table if exists public.profiles;
-- Create a table for public profiles
create table
  public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    username text unique,
    full_name text,
    phone_number text,
    avatar_url text,
    website text,
    bio text,
    location text,
    dob text,
    private boolean,
    verified boolean,
    constraint username_length check (char_length(username) >= 3)
  );


-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles for
select
  using (true);

create policy "Users can insert their own profile." on public.profiles for insert
with
  check (id = auth.uid ());

create policy "Can only update own profile data." on public.profiles
for update
  to authenticated using (
    (
      select
        auth.uid ()
    ) = id
  )
with
  check (
    (
      select
        auth.uid ()
    ) = id
  );

drop function if exists public.handle_new_user cascade;
-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user () returns trigger
set search_path = 'public' as $$
begin
  insert into public.profiles (
    id, created_at, full_name, avatar_url, bio, private, verified, username, website, location, dob
  ) values (
    NEW.id, 
    NEW.created_at,
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'phone_number',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'bio',
    (NEW.raw_user_meta_data->>'private')::boolean,
    (NEW.raw_user_meta_data->>'verified')::boolean,
    NEW.raw_user_meta_data->>'website',
    NEW.raw_user_meta_data->>'location',
    NEW.raw_user_meta_data->>'dob'
  );
  return NEW;
end;
$$ language plpgsql security definer;

-- create trigger on_auth_user_created
-- after insert on auth.users for each row
-- execute procedure public.handle_new_user ();
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

DELETE from storage.buckets
where
  Name= 'avatars';
-- Set up Storage!
insert into
  storage.buckets (id, name)
values
  ('avatars', 'avatars');

DROP policy if exists "Avatar images are publicly accessible." on storage.objects;
-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects for
select
  using (bucket_id = 'avatars');

DROP policy if exists "Authenticated users can upload an avatar." on storage.objects;
create policy "Authenticated users can upload an avatar." on storage.objects for insert to authenticated
with
  check (bucket_id = 'avatars')