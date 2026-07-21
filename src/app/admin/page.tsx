import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Newspaper, Sprout, Mail } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [posts, programs, messages] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("programs").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
  ]);

  const cards = [
    { label: "Total Berita", value: posts.count ?? 0, href: "/admin/posts", icon: Newspaper },
    { label: "Total Program", value: programs.count ?? 0, href: "/admin/programs", icon: Sprout },
    { label: "Pesan Belum Dibaca", value: messages.count ?? 0, href: "/admin/pesan", icon: Mail },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        Ringkasan cepat konten dan pesan yang masuk.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-forest-800/10 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <Icon className="text-marigold-600" size={22} />
            <p className="mt-3 font-display text-3xl font-semibold text-forest-900">
              {value}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
