"use client";

import { useActionState } from "react";
import { submitContactForm, type FormState } from "@/lib/actions";

const initialState: FormState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-forest-900" htmlFor="name">
          Nama
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-forest-800/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-forest-900" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-forest-800/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-forest-900" htmlFor="message">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-forest-800/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-marigold-500"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-700 disabled:opacity-60"
      >
        {pending ? "Mengirim..." : "Kirim Pesan"}
      </button>

      {state.status !== "idle" && (
        <p
          className={`text-sm ${
            state.status === "success" ? "text-forest-700" : "text-clay-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
