import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePost } from "@/lib/admin-actions";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  const updateWithId = updatePost.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Edit Berita
      </h1>
      <div className="mt-6 max-w-2xl rounded-2xl border border-forest-800/10 bg-white p-6">
        <PostForm action={updateWithId} post={post} />
      </div>
    </div>
  );
}
