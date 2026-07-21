"use client";

import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  photo_url: string;
}

export default function TeamMembersField({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const initial: TeamMember[] = (() => {
    try {
      const parsed = JSON.parse(defaultValue);
      return Array.isArray(parsed)
        ? parsed.map((m: Record<string, string>) => ({
            name: m.name || "",
            role: m.role || "",
            photo_url: m.photo_url || "",
          }))
        : [];
    } catch {
      return [];
    }
  })();

  const [members, setMembers] = useState<TeamMember[]>(initial);

  function update(index: number, field: keyof TeamMember, value: string) {
    const next = [...members];
    next[index] = { ...next[index], [field]: value };
    setMembers(next);
  }

  function add() {
    setMembers([...members, { name: "", role: "", photo_url: "" }]);
  }

  function remove(index: number) {
    setMembers(members.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="space-y-4">
        {members.map((m, i) => (
          <div key={i} className="rounded-lg border border-forest-800/10 bg-paper p-4">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                {m.photo_url ? (
                  <img
                    src={m.photo_url}
                    alt={m.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-800/10 text-xs text-ink-soft">
                    Foto
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nama"
                    value={m.name}
                    onChange={(e) => update(i, "name", e.target.value)}
                    className="flex-1 rounded-lg border border-forest-800/15 bg-white px-4 py-2.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Peran"
                    value={m.role}
                    onChange={(e) => update(i, "role", e.target.value)}
                    className="flex-1 rounded-lg border border-forest-800/15 bg-white px-4 py-2.5 text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="URL Foto (upload ke Galeri, lalu paste URL di sini)"
                  value={m.photo_url}
                  onChange={(e) => update(i, "photo_url", e.target.value)}
                  className="w-full rounded-lg border border-forest-800/15 bg-white px-4 py-2.5 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="shrink-0 rounded-lg border border-red-300 px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 rounded-lg border border-forest-800/15 px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-paper-dim"
      >
        + Tambah Pengurus
      </button>
      <input type="hidden" name="about_team" value={JSON.stringify(members)} />
    </div>
  );
}
