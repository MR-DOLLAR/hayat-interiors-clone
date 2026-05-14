-- Roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'admin',
  created_at timestamptz not null default now(),
  unique(user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "users view own roles" on public.user_roles for select using (auth.uid() = user_id);

-- Auto-grant admin role to seed admin email
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.email = 'admin@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- Services
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  image_url text,
  summary text,
  pricing text,
  timeline text,
  features text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.services enable row level security;
create policy "public read services" on public.services for select using (true);
create policy "admins manage services" on public.services for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger services_updated before update on public.services for each row execute function public.set_updated_at();

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  cover_image_url text,
  type text,
  location text,
  year int,
  area text,
  style text,
  budget text,
  tagline text,
  description text,
  details text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create policy "public read projects" on public.projects for select using (true);
create policy "admins manage projects" on public.projects for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger projects_updated before update on public.projects for each row execute function public.set_updated_at();

-- Project images (gallery)
create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  image_url text not null,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.project_images enable row level security;
create policy "public read project images" on public.project_images for select using (true);
create policy "admins manage project images" on public.project_images for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Site settings (key/value)
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
create policy "public read settings" on public.site_settings for select using (true);
create policy "admins manage settings" on public.site_settings for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger site_settings_updated before update on public.site_settings for each row execute function public.set_updated_at();

-- Storage bucket
insert into storage.buckets (id, name, public) values ('site-images', 'site-images', true)
  on conflict (id) do nothing;

create policy "public read site-images" on storage.objects for select using (bucket_id = 'site-images');
create policy "admins upload site-images" on storage.objects for insert
  with check (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));
create policy "admins update site-images" on storage.objects for update
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));
create policy "admins delete site-images" on storage.objects for delete
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));
