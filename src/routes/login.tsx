import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { brand } from "@/data/site";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: `Admin Login — ${brand.name}` }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signUp, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [loading, user, isAdmin, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); setSubmitting(true);
    const fn = mode === "signin" ? signIn : signUp;
    const { error: err } = await fn(email, password);
    setSubmitting(false);
    if (err) setError(err);
    else if (mode === "signup") setMode("signin");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/40 via-background to-secondary/20 px-4 py-16">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <Link to="/" className="text-xs uppercase tracking-[0.25em] text-accent">{brand.name}</Link>
        </div>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          <h1 className="font-display text-3xl mb-1">{mode === "signin" ? "Welcome back" : "Create admin account"}</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "signin" ? "Sign in to manage your site content." : "One-time setup for your admin account."}
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" disabled={submitting}
              className="w-full inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
              {submitting ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>
          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>First time? <button onClick={() => setMode("signup")} className="text-foreground underline">Create admin account</button></>
            ) : (
              <>Already have an account? <button onClick={() => setMode("signin")} className="text-foreground underline">Sign in</button></>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back to site</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
