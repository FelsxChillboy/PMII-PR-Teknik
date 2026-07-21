import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/supabase/server";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  weight: ["400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.org_name || "Komunitas Akar Harapan",
    description: settings.org_description || "",
    icons: settings.favicon_url ? { icon: settings.favicon_url } : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  const navLinks: { href: string; label: string }[] = (() => {
    try {
      const arr = JSON.parse(settings.nav_links);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  })();

  const footerLinks: { href: string; label: string }[] = (() => {
    try {
      const arr = JSON.parse(settings.footer_links);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  })();

  return (
    <html
      lang="id"
      style={
        {
          "--color-forest-950": settings.theme_primary,
          "--color-forest-900": settings.theme_primary,
          "--color-marigold-500": settings.theme_accent,
          "--color-marigold-600": settings.theme_accent,
          "--color-paper": settings.theme_bg,
        } as React.CSSProperties
      }
    >
      <body
        className={`${fraunces.variable} ${jakarta.variable} ${plexMono.variable} antialiased`}
      >
        <Navbar
          orgName={settings.org_name}
          orgLogoUrl={settings.org_logo_url}
          links={navLinks}
        />
        <main>{children}</main>
        <Footer
          orgName={settings.org_name}
          orgDescription={settings.org_description}
          contactEmail={settings.contact_email}
          contactLocation={settings.contact_location}
          contactInstagram={settings.contact_instagram}
          links={footerLinks}
        />
      </body>
    </html>
  );
}
