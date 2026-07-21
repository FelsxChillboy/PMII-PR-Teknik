import { createClient } from "@/lib/supabase/server";

export default async function GaleriPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("id, title, image_url")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-clay-500">
        Galeri
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest-900">
        Dokumentasi kegiatan
      </h1>

      {items && items.length > 0 ? (
        <div className="mt-10 columns-2 gap-4 sm:columns-3">
          {items.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full rounded-xl object-cover"
              />
              <p className="mt-1 text-xs text-ink-soft">{item.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-forest-800/20 bg-white/50 p-10 text-center">
          <p className="font-display text-lg font-semibold text-forest-900">
            Galeri masih kosong
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Unggah foto pertama lewat panel admin.
          </p>
        </div>
      )}
    </div>
  );
}
