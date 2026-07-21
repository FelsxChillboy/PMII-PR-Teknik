"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Sprout,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-forest-800/10 bg-forest-950 text-paper transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <p className="font-display text-lg font-semibold">Akar Harapan</p>
            <p className="font-mono text-xs text-paper/50">Panel Admin</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
            aria-label="Tutup menu"
          >
            <X size={20} className="text-paper/70" />
          </button>
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
                onClick={() => setSidebarOpen(false)}
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

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 rounded-lg border border-forest-800/10 bg-white p-2 lg:hidden"
          aria-label="Buka menu"
        >
          <Menu size={20} className="text-forest-900" />
        </button>
        {children}
      </div>
    </div>
  );
}
