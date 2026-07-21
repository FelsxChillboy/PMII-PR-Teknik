import { Mail, MapPin, AtSign } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/supabase/server";

export default async function KontakPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-6 py-20 md:grid-cols-2 md:gap-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-clay-500">
          Kontak
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-forest-900">
          {settings.contact_heading}
        </h1>
        <p className="mt-4 text-ink-soft">
          {settings.contact_description}
        </p>

        <ul className="mt-8 space-y-4 text-sm text-ink-soft">
          <li className="flex items-center gap-3">
            <Mail size={18} className="text-marigold-600" /> {settings.contact_email}
          </li>
          <li className="flex items-center gap-3">
            <MapPin size={18} className="text-marigold-600" /> {settings.contact_location}
          </li>
          <li className="flex items-center gap-3">
            <AtSign size={18} className="text-marigold-600" /> {settings.contact_instagram}
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-forest-800/10 bg-paper-dim p-6">
        <ContactForm />
      </div>
    </div>
  );
}
