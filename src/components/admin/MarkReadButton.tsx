"use client";

import { useTransition } from "react";
import { Check } from "lucide-react";

export default function MarkReadButton({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => action(id))}
      disabled={pending}
      className="flex items-center gap-1 text-sm font-medium text-forest-800 hover:text-marigold-600 disabled:opacity-50"
    >
      <Check size={14} /> {pending ? "Menandai..." : "Tandai Dibaca"}
    </button>
  );
}
