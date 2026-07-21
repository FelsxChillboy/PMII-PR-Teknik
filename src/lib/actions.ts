"use server";

import { createClient } from "@/lib/supabase/server";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Semua kolom wajib diisi." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });

  if (error) {
    return { status: "error", message: "Gagal mengirim pesan. Coba lagi." };
  }

  return { status: "success", message: "Pesan kamu sudah terkirim. Terima kasih!" };
}
