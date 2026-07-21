"use client";

import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
}

export default function TeamMembersField({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const initial: TeamMember[] = (() => {
    try {
      const parsed = JSON.parse(defaultValue);
      return Array.isArray(parsed) ? parsed : [];
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
    setMembers([...members, { name: "", role: "" }]);
  }

  function remove(index: number) {
    setMembers(members.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="space-y-3">
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Nama"
              value={m.name}
              onChange={(e) => update(i, "name", e.target.value)}
              className="flex-1 rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
            />
            <input
              type="text"
              placeholder="Peran"
              value={m.role}
              onChange={(e) => update(i, "role", e.target.value)}
              className="flex-1 rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="shrink-0 rounded-lg border border-red-300 px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              Hapus
            </button>
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
