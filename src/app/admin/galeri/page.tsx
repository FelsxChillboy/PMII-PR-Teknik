import { createClient } from "@/lib/supabase/server";
import { addGalleryItem, deleteGalleryItem } from "@/lib/admin-actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminGaleriPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("id, title, image_url")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Galeri
      </h1>

      <div className="mt-6 max-w-xl rounded-2xl border border-forest-800/10 bg-white p-6">
        <form action={addGalleryItem} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-forest-900">
              Judul foto
            </label>
            <input
              name="title"
              required
              className="mt-1 w-full rounded-lg border border-forest-800/20 px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-forest-900">Foto</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="mt-1 w-full text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-forest-700"
          >
            Unggah
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items?.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-xl bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image_url}
              alt={item.title}
              className="aspect-square w-full object-cover"
            />
            <div className="flex items-center justify-between p-2">
              <p className="truncate text-xs text-ink-soft">{item.title}</p>
              <DeleteButton id={item.id} action={deleteGalleryItem} label="" />
            </div>
          </div>
        ))}
      </div>

      {(!items || items.length === 0) && (
        <p className="mt-6 text-sm text-ink-soft">Belum ada foto di galeri.</p>
      )}
    </div>
  );
}
