import { createPost } from "@/lib/admin-actions";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Tulis Berita Baru
      </h1>
      <div className="mt-6 max-w-2xl rounded-2xl border border-forest-800/10 bg-white p-6">
        <PostForm action={createPost} />
      </div>
    </div>
  );
}
