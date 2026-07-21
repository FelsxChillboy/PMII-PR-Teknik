type Post = {
  title?: string;
  excerpt?: string;
  content?: string;
  is_published?: boolean;
};

export default function PostForm({
  action,
  post,
}: {
  action: (formData: FormData) => Promise<void>;
  post?: Post;
}) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-forest-900">Judul</label>
        <input
          name="title"
          required
          defaultValue={post?.title}
          className="mt-1 w-full rounded-lg border border-forest-800/20 px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-forest-900">
          Ringkasan singkat
        </label>
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className="mt-1 w-full rounded-lg border border-forest-800/20 px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-forest-900">
          Isi lengkap
        </label>
        <textarea
          name="content"
          required
          rows={10}
          defaultValue={post?.content}
          className="mt-1 w-full rounded-lg border border-forest-800/20 px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-forest-900">
          Gambar sampul {post ? "(kosongkan jika tidak ganti)" : ""}
        </label>
        <input
          type="file"
          name="cover"
          accept="image/*"
          className="mt-1 w-full text-sm"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-forest-900">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={post?.is_published ?? true}
        />
        Tampilkan langsung di website (terbit)
      </label>

      <button
        type="submit"
        className="rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-forest-700"
      >
        Simpan
      </button>
    </form>
  );
}
