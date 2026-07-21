"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({
  id,
  action,
  label = "",
}: {
  id: string;
  action: (id: string) => Promise<void>;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (!confirm("Yakin ingin menghapus data ini?")) return;
        startTransition(() => action(id));
      }}
      disabled={pending}
      className="flex items-center gap-1 text-sm font-medium text-clay-500 hover:text-clay-500/70 disabled:opacity-50"
    >
      <Trash2 size={14} /> {label || (pending ? "Menghapus..." : "Hapus")}
    </button>
  );
}
