import Link from "next/link";
import { createClient, getSettings } from "@/lib/supabase/server";

export default async function BeritaListPage() {
  const supabase = await createClient();
  const settings = await getSettings();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div
      className="mx-auto max-w-4xl px-6 py-20"
      style={
        settings.home_bg_url
          ? {
              backgroundImage: `url(${settings.home_bg_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
            }
          : undefined
      }
    >
      <div className={settings.home_bg_url ? "rounded-2xl bg-paper/80 p-8 backdrop-blur-sm" : ""}>
        <p className="font-mono text-xs uppercase tracking-widest text-clay-500">
          Berita
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-forest-900">
          {settings.berita_heading}
        </h1>

        {posts && posts.length > 0 ? (
          <div className="mt-10 divide-y divide-forest-800/10">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/berita/${post.slug}`}
                className="group block py-6"
              >
                <p className="font-mono text-xs text-ink-soft">
                  {new Date(post.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-forest-900 group-hover:text-marigold-600">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-ink-soft">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-forest-800/20 bg-white/50 p-10 text-center">
            <p className="font-display text-lg font-semibold text-forest-900">
              Belum ada berita
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Tulis berita pertamamu lewat panel admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
