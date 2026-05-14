-- Restrict SECURITY DEFINER fns from being callable by anon/authenticated
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- set_updated_at doesn't need search_path warning since it's trigger-only, but set it for safety
create or replace function public.set_updated_at()
returns trigger language plpgsql security definer set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- Drop broad public select on storage; public bucket URLs still work without it
drop policy if exists "public read site-images" on storage.objects;
