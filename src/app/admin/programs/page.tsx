import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProgram } from "@/lib/admin-actions";
import { Plus } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProgramsPage() {
  const supabase = await createClient();
  const { data: programs } = await supabase
    .from("programs")
    .select("id, title, category, is_published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-forest-900">
          Program
        </h1>
        <Link
          href="/admin/programs/baru"
          className="flex items-center gap-2 rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-paper hover:bg-forest-700"
        >
          <Plus size={16} /> Tambah Program
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-forest-800/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-dim text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-5 py-3">Judul</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-800/10">
            {programs?.map((program) => (
              <tr key={program.id}>
                <td className="px-5 py-3 font-medium text-forest-900">
                  {program.title}
                </td>
                <td className="px-5 py-3 text-ink-soft">{program.category}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      program.is_published
                        ? "bg-forest-100 text-forest-800"
                        : "bg-clay-100 text-clay-500"
                    }`}
                  >
                    {program.is_published ? "Terbit" : "Draf"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/programs/${program.id}`}
                      className="text-sm font-medium text-forest-800 hover:text-marigold-600"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={program.id} action={deleteProgram} />
                  </div>
                </td>
              </tr>
            ))}
            {(!programs || programs.length === 0) && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-ink-soft">
                  Belum ada program. Klik &quot;Tambah Program&quot; untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
