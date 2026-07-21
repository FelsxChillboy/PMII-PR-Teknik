"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function uploadImageIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  fieldName: string
): Promise<string | null> {
  const file = formData.get(fieldName) as File | null;
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop();
  const path = `${fieldName}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file);
  if (error) return null;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

// ===== POSTS (Berita) =====
export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") || "");
  const cover_image_url = await uploadImageIfPresent(supabase, formData, "cover");

  await supabase.from("posts").insert({
    title,
    slug: slugify(title),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    is_published: formData.get("is_published") === "on",
    cover_image_url,
  });

  revalidatePath("/admin/posts");
  revalidatePath("/berita");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") || "");
  const newCover = await uploadImageIfPresent(supabase, formData, "cover");

  const updates: Record<string, unknown> = {
    title,
    slug: slugify(title),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    is_published: formData.get("is_published") === "on",
  };
  if (newCover) updates.cover_image_url = newCover;

  await supabase.from("posts").update(updates).eq("id", id);

  revalidatePath("/admin/posts");
  revalidatePath("/berita");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/admin/posts");
  revalidatePath("/berita");
}

// ===== PROGRAMS =====
export async function createProgram(formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") || "");
  const cover_image_url = await uploadImageIfPresent(supabase, formData, "cover");

  await supabase.from("programs").insert({
    title,
    slug: slugify(title),
    category: String(formData.get("category") || "umum"),
    summary: String(formData.get("summary") || ""),
    content: String(formData.get("content") || ""),
    is_published: formData.get("is_published") === "on",
    cover_image_url,
  });

  revalidatePath("/admin/programs");
  revalidatePath("/program");
  redirect("/admin/programs");
}

export async function updateProgram(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") || "");
  const newCover = await uploadImageIfPresent(supabase, formData, "cover");

  const updates: Record<string, unknown> = {
    title,
    slug: slugify(title),
    category: String(formData.get("category") || "umum"),
    summary: String(formData.get("summary") || ""),
    content: String(formData.get("content") || ""),
    is_published: formData.get("is_published") === "on",
  };
  if (newCover) updates.cover_image_url = newCover;

  await supabase.from("programs").update(updates).eq("id", id);

  revalidatePath("/admin/programs");
  revalidatePath("/program");
  redirect("/admin/programs");
}

export async function deleteProgram(id: string) {
  const supabase = await createClient();
  await supabase.from("programs").delete().eq("id", id);
  revalidatePath("/admin/programs");
  revalidatePath("/program");
}

// ===== GALLERY =====
export async function addGalleryItem(formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") || "");
  const image_url = await uploadImageIfPresent(supabase, formData, "image");

  if (!image_url) return;

  await supabase.from("gallery_items").insert({ title, image_url });

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();
  await supabase.from("gallery_items").delete().eq("id", id);
  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
}

// ===== CONTACT MESSAGES =====
export async function markMessageRead(id: string) {
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin/pesan");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/pesan");
}

// ===== SITE SETTINGS =====
export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  const keys = [
    "org_name",
    "org_tagline",
    "org_description",
    "org_logo_url",
    "contact_email",
    "contact_location",
    "contact_instagram",
    "theme_primary",
    "theme_accent",
    "theme_bg",
    "about_heading",
    "about_intro",
    "about_vision",
    "about_missions",
    "about_team",
    "favicon_url",
    "contact_heading",
    "contact_description",
    "berita_heading",
    "home_bg_url",
    "nav_links",
    "footer_links",
  ];

  const updates = keys.map((key) => {
    let value = String(formData.get(key) || "");
    if (key === "about_missions") {
      const lines = value.split("\n").filter((l) => l.trim() !== "");
      value = JSON.stringify(lines);
    }
    return {
      key,
      value,
      updated_at: new Date().toISOString(),
    };
  });

  const { error } = await supabase
    .from("site_settings")
    .upsert(updates, { onConflict: "key" });

  if (error) {
    console.error("[updateSettings] Upsert error:", JSON.stringify(error));
    throw new Error(`Gagal menyimpan pengaturan: ${error.message}`);
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  revalidatePath("/tentang");
  revalidatePath("/kontak");
  revalidatePath("/berita");
  redirect("/admin/settings");
}
