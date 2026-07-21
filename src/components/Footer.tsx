"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AtSign, Mail, MapPin } from "lucide-react";

interface FooterLink {
  href: string;
  label: string;
}

export default function Footer({
  orgName,
  orgDescription,
  contactEmail,
  contactLocation,
  contactInstagram,
  links,
}: {
  orgName: string;
  orgDescription: string;
  contactEmail: string;
  contactLocation: string;
  contactInstagram: string;
  links: FooterLink[];
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-forest-800/10 bg-forest-900 text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">{orgName}</p>
          <p className="mt-3 max-w-xs text-sm text-paper/70">
            {orgDescription}
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-marigold-500">
            Jelajahi
          </p>
          <ul className="mt-3 space-y-2 text-sm text-paper/80">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-marigold-500">
            Kontak
          </p>
          <ul className="mt-3 space-y-2 text-sm text-paper/80">
            <li className="flex items-center gap-2">
              <Mail size={16} /> <a href={`mailto:${contactEmail}`} className="hover:text-marigold-500 transition-colors">{contactEmail}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> {contactLocation}
            </li>
            <li className="flex items-center gap-2">
              <AtSign size={16} /> <a href={`https://instagram.com/${contactInstagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-marigold-500 transition-colors">{contactInstagram}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-5 text-center font-mono text-xs text-paper/50">
        © {new Date().getFullYear()} {orgName}. Dibuat dengan gotong royong.
      </div>
    </footer>
  );
}
