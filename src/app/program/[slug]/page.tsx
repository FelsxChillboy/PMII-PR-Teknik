import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!program) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-marigold-600">
        {program.category}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest-900">
        {program.title}
      </h1>
      <p className="mt-4 text-lg text-ink-soft">{program.summary}</p>

      {program.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={program.cover_image_url}
          alt={program.title}
          className="mt-8 w-full rounded-2xl object-cover"
        />
      )}

      <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-ink">
        {program.content}
      </div>
    </article>
  );
}
