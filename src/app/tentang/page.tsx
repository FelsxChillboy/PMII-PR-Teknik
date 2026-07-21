import { Sprout, Users, Target } from "lucide-react";
import { getSettings } from "@/lib/supabase/server";

interface TeamMember {
  name: string;
  role: string;
  photo_url?: string;
}

export default async function TentangPage() {
  const settings = await getSettings();

  const missions: string[] = (() => {
    try {
      const arr = JSON.parse(settings.about_missions);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  })();

  const team: TeamMember[] = (() => {
    try {
      const arr = JSON.parse(settings.about_team);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-clay-500">
        Tentang Kami
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest-900 md:text-5xl">
        {settings.about_heading}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        {settings.about_intro}
      </p>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <Target className="text-marigold-600" size={28} />
          <h2 className="mt-4 font-display text-xl font-semibold text-forest-900">
            Visi
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            {settings.about_vision}
          </p>
        </div>
        <div className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <Sprout className="text-marigold-600" size={28} />
          <h2 className="mt-4 font-display text-xl font-semibold text-forest-900">
            Misi
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-ink-soft">
            {missions.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      {team.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center gap-3">
            <Users className="text-clay-500" size={24} />
            <h2 className="font-display text-2xl font-semibold text-forest-900">
              Pengurus Inti
            </h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {team.map((person) => (
              <div
                key={person.name}
                className="rounded-xl bg-paper-dim p-5 text-center"
              >
                {person.photo_url ? (
                  <img
                    src={person.photo_url}
                    alt={person.name}
                    className="mx-auto h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-800/20 text-sm text-ink-soft">
                    {person.name.charAt(0)}
                  </div>
                )}
                <p className="mt-3 font-display font-semibold text-forest-900">
                  {person.name}
                </p>
                <p className="text-xs text-ink-soft">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
