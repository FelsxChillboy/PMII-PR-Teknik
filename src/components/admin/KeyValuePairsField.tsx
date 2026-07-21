"use client";

import { useState } from "react";

interface KeyValuePair {
  href: string;
  label: string;
}

export default function KeyValuePairsField({
  defaultValue,
  name,
  keyLabel = "href",
  valueLabel = "label",
}: {
  defaultValue: string;
  name: string;
  keyLabel?: string;
  valueLabel?: string;
}) {
  const initial: KeyValuePair[] = (() => {
    try {
      const parsed = JSON.parse(defaultValue);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const [pairs, setPairs] = useState<KeyValuePair[]>(initial);

  function update(index: number, field: keyof KeyValuePair, value: string) {
    const next = [...pairs];
    next[index] = { ...next[index], [field]: value };
    setPairs(next);
  }

  function add() {
    setPairs([...pairs, { href: "", label: "" }]);
  }

  function remove(index: number) {
    setPairs(pairs.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const next = [...pairs];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    setPairs(next);
  }

  function moveDown(index: number) {
    if (index === pairs.length - 1) return;
    const next = [...pairs];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    setPairs(next);
  }

  return (
    <div>
      <div className="space-y-2">
        {pairs.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={keyLabel}
              value={p.href}
              onChange={(e) => update(i, "href", e.target.value)}
              className="w-1/3 rounded-lg border border-forest-800/15 bg-paper px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder={valueLabel}
              value={p.label}
              onChange={(e) => update(i, "label", e.target.value)}
              className="w-1/3 rounded-lg border border-forest-800/15 bg-paper px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => moveUp(i)}
              disabled={i === 0}
              className="shrink-0 rounded-lg border border-forest-800/15 px-2 py-2 text-xs text-ink-soft transition-colors hover:bg-paper-dim disabled:opacity-30"
            >
              &#9650;
            </button>
            <button
              type="button"
              onClick={() => moveDown(i)}
              disabled={i === pairs.length - 1}
              className="shrink-0 rounded-lg border border-forest-800/15 px-2 py-2 text-xs text-ink-soft transition-colors hover:bg-paper-dim disabled:opacity-30"
            >
              &#9660;
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              className="shrink-0 rounded-lg border border-red-300 px-2 py-2 text-xs text-red-600 transition-colors hover:bg-red-50"
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
        + Tambah
      </button>
      <input type="hidden" name={name} value={JSON.stringify(pairs)} />
    </div>
  );
}
