"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Sprout,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Berita", icon: Newspaper },
  { href: "/admin/programs", label: "Program", icon: Sprout },
  { href: "/admin/galeri", label: "Galeri", icon: ImageIcon },
  { href: "/admin/pesan", label: "Pesan Masuk", icon: Mail },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-paper">{children}</div>;
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-paper-dim">
      <aside className="flex w-64 shrink-0 flex-col border-r border-forest-800/10 bg-forest-950 text-paper">
        <div className="px-6 py-6">
          <p className="font-display text-lg font-semibold">Akar Harapan</p>
          <p className="font-mono text-xs text-paper/50">Panel Admin</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-forest-800 text-marigold-500"
                    : "text-paper/70 hover:bg-forest-900"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="mx-3 mb-6 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-paper/70 hover:bg-forest-900"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </aside>

      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
