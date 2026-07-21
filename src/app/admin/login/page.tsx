"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email atau kata sandi salah.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-forest-800/10 bg-white p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-marigold-600">
          Panel Admin
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-forest-900">
          Masuk untuk mengelola konten
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-forest-900">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-forest-800/20 px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-forest-900">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-forest-800/20 px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
            />
          </div>

          {error && <p className="text-sm text-clay-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-forest-700 disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-xs text-ink-soft">
          Akun admin dibuat lewat Supabase Dashboard &gt; Authentication &gt;
          Users, bukan lewat halaman ini.
        </p>
      </div>
    </div>
  );
}
