import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs text-ink-soft">
        {new Date(post.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest-900">
        {post.title}
      </h1>

      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="mt-8 w-full rounded-2xl object-cover"
        />
      )}

      <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-ink">
        {post.content}
      </div>
    </article>
  );
}
