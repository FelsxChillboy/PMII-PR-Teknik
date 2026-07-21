import { createClient } from "@/lib/supabase/server";
import { markMessageRead, deleteMessage } from "@/lib/admin-actions";
import DeleteButton from "@/components/admin/DeleteButton";
import MarkReadButton from "@/components/admin/MarkReadButton";

export default async function AdminPesanPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Pesan Masuk
      </h1>

      <div className="mt-6 space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl border p-5 ${
              msg.is_read
                ? "border-forest-800/10 bg-white"
                : "border-marigold-500/40 bg-marigold-100/40"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-display font-semibold text-forest-900">
                  {msg.name}
                </p>
                <p className="text-xs text-ink-soft">{msg.email}</p>
              </div>
              <p className="font-mono text-xs text-ink-soft">
                {new Date(msg.created_at).toLocaleString("id-ID")}
              </p>
            </div>
            <p className="mt-3 text-sm text-ink">{msg.message}</p>
            <div className="mt-4 flex gap-4">
              {!msg.is_read && (
                <MarkReadButton id={msg.id} action={markMessageRead} />
              )}
              <DeleteButton id={msg.id} action={deleteMessage} />
            </div>
          </div>
        ))}

        {(!messages || messages.length === 0) && (
          <p className="text-sm text-ink-soft">Belum ada pesan masuk.</p>
        )}
      </div>
    </div>
  );
}
