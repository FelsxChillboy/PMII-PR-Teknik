import { ExternalLink, Scale } from "lucide-react";
import { getSettings } from "@/lib/supabase/server";

interface LegalProduct {
  title: string;
  url: string;
}

export default async function ProdukHukumPage() {
  const settings = await getSettings();

  const products: LegalProduct[] = (() => {
    try {
      const arr = JSON.parse(settings.legal_products);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-clay-500">
        Produk Hukum
      </p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-forest-900">
        Dokumen hukum & kebijakan
      </h1>
      <p className="mt-4 text-ink-soft">
        Kumpulan produk hukum terkait kegiatan organisasi yang dapat diakses secara terbuka.
      </p>

      {products.length > 0 ? (
        <div className="mt-10 space-y-4">
          {products.map((product, i) => (
            <a
              key={i}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-forest-800/10 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800/10">
                  <Scale size={18} className="text-forest-800" />
                </div>
                <span className="font-display font-semibold text-forest-900 group-hover:text-marigold-600">
                  {product.title}
                </span>
              </div>
              <ExternalLink size={18} className="shrink-0 text-ink-soft group-hover:text-marigold-600" />
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-forest-800/20 bg-white/50 p-10 text-center">
          <p className="font-display text-lg font-semibold text-forest-900">
            Belum ada produk hukum
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Tambahkan dokumen lewat panel admin.
          </p>
        </div>
      )}
    </div>
  );
}
