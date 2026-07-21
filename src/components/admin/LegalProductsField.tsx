"use client";

import { useState } from "react";

interface LegalProduct {
  title: string;
  url: string;
}

export default function LegalProductsField({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const initial: LegalProduct[] = (() => {
    try {
      const parsed = JSON.parse(defaultValue);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const [products, setProducts] = useState<LegalProduct[]>(initial);

  function update(index: number, field: keyof LegalProduct, value: string) {
    const next = [...products];
    next[index] = { ...next[index], [field]: value };
    setProducts(next);
  }

  function add() {
    setProducts([...products, { title: "", url: "" }]);
  }

  function remove(index: number) {
    setProducts(products.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="space-y-3">
        {products.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Judul produk hukum"
              value={p.title}
              onChange={(e) => update(i, "title", e.target.value)}
              className="flex-1 rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
            />
            <input
              type="url"
              placeholder="Link Google Drive"
              value={p.url}
              onChange={(e) => update(i, "url", e.target.value)}
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
        + Tambah Produk Hukum
      </button>
      <input type="hidden" name="legal_products" value={JSON.stringify(products)} />
    </div>
  );
}
