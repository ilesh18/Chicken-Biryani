"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogleFirebase } from "@/lib/firebase/client";
import { AlertCircle, ArrowLeft } from "lucide-react";

type ProfileRole = "student" | "faculty" | "admin";

const ROLE_LABELS: Record<ProfileRole, string> = {
  student: "Student",
  faculty: "Faculty",
  admin: "Admin",
};

const ROLE_PORTAL: Record<ProfileRole, string> = {
  student: "Student Portal",
  faculty: "Faculty Portal",
  admin: "Admin Portal",
};

const ROLE_DASHBOARD: Record<ProfileRole, string> = {
  student: "/student/dashboard",
  faculty: "/faculty/dashboard",
  admin: "/admin/dashboard",
};

const ROLE_PLACEHOLDER: Record<ProfileRole, string> = {
  student: "student@example.com",
  faculty: "faculty@example.com",
  admin: "admin@example.com",
};

function LoginContent() {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as ProfileRole) || "student";

  const [profile, setProfile] = React.useState<ProfileRole>(
    initialRole === "faculty" ? "faculty" : initialRole === "admin" ? "admin" : "student"
  );
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  React.useEffect(() => {
    const roleParam = searchParams.get("role") as ProfileRole;
    if (roleParam === "student" || roleParam === "faculty" || roleParam === "admin") {
      setProfile(roleParam);
    }
  }, [searchParams]);

  const roleName = ROLE_LABELS[profile];
  const targetDashboard = ROLE_DASHBOARD[profile];

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);

    try {
      const googleUser = await signInWithGoogleFirebase(profile);

      try {
        await fetch("/api/auth/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: googleUser.email,
            name: googleUser.name,
            uid: googleUser.uid,
            role: profile,
          }),
        });
      } catch (syncErr) {
        console.warn("Backend user sync warning:", syncErr);
      }

      const result = await signIn("credentials", {
        email: googleUser.email,
        isGoogleAuth: "true",
        role: profile,
        redirect: false,
      });

      if (result?.error) {
        setError("Unable to initialize session. Please try again.");
        return;
      }

      window.location.href = targetDashboard;
    } catch (err) {
      const e = err as { code?: string; message?: string };
      console.error("Google Sign-In Error:", err);
      if (e?.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed before completing.");
      } else if (e?.code === "auth/cancelled-popup-request") {
        setError("Sign-in request was cancelled.");
      } else if (e?.code === "auth/unauthorized-domain") {
        setError("Domain not authorized in Firebase Console. Please add localhost/domain to Firebase Auth Authorized Domains.");
      } else {
        setError(e?.message || "Google Sign-In failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        role: profile,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      window.location.href = targetDashboard;
    } catch {
      setError("Unable to complete the request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-surface p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <Link
            href="/select-role"
            className="inline-flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Change Profile</span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
            {ROLE_PORTAL[profile]}
          </span>
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2">
            <Logo className="h-12 w-12" />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            {roleName} Sign In
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Sign in to access your {roleName} Dashboard
          </p>
        </div>

        {/* Google Sign In Option */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-3 py-5 text-sm font-medium border-border hover:bg-surface-muted"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            {googleLoading
              ? `Signing in as ${roleName}...`
              : `Sign in with Google (${roleName})`}
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-border" />
            <span className="absolute bg-surface px-2 text-xs text-foreground-muted uppercase">
              Or with credentials
            </span>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder={ROLE_PLACEHOLDER[profile]}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-accent hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-error bg-error/10 p-3 rounded-md border border-error/20" role="alert">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" className="w-full py-5 font-semibold" disabled={loading || googleLoading}>
            {loading ? "Signing in..." : `Sign in as ${roleName}`}
          </Button>
        </form>

        <p className="text-center text-sm text-foreground-muted">
          Don&apos;t have an account?{" "}
          <Link href={`/signup?role=${profile}`} className="text-accent hover:underline font-medium">
            Sign up as {roleName}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginContent />
    </React.Suspense>
  );
}
