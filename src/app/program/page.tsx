import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ProgramListPage() {
  const supabase = await createClient();
  const { data: programs } = await supabase
    .from("programs")
    .select("id, title, slug, category, summary")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-clay-500">
        Program
      </p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-forest-900">
        Semua program kami
      </h1>

      {programs && programs.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programs.map((p) => (
            <Link
              key={p.id}
              href={`/program/${p.slug}`}
              className="group rounded-2xl border border-forest-800/10 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-marigold-600">
                {p.category}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-forest-900 group-hover:text-marigold-600">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft line-clamp-3">
                {p.summary}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-forest-800/20 bg-white/50 p-10 text-center">
          <p className="font-display text-lg font-semibold text-forest-900">
            Belum ada program
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Tambahkan program pertamamu lewat panel admin.
          </p>
        </div>
      )}
    </div>
  );
}
