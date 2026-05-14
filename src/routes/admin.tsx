import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { brand } from "@/data/site";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: `Admin — ${brand.name}` }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const tabs: Array<{ to: string; label: string; exact?: boolean }> = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/settings", label: "Brand & Contact" },
];

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({ to: "/login" });
  }, [loading, user, isAdmin, navigate]);

  if (loading || !user || !isAdmin) {
    return <div className="min-h-screen pt-32 grid place-items-center text-sm text-muted-foreground">Checking access…</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-secondary/30">
      <div className="container-x mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Admin Panel</p>
            <h1 className="font-display text-3xl md:text-4xl mt-1">Manage Content</h1>
          </div>
          <button onClick={async () => { await signOut(); navigate({ to: "/" }); }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut size={16} /> Sign out
          </button>
        </div>

        <nav className="flex flex-wrap gap-1 border-b border-border mb-6">
          {tabs.map((t) => {
            const active = t.exact ? location.pathname === t.to : location.pathname.startsWith(t.to);
            return (
              <Link key={t.to} to={t.to as "/admin"}
                className={`px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors ${
                  active ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>
                {t.label}
              </Link>
            );
          })}
        </nav>

        <Outlet />
      </div>
    </div>
  );
}
