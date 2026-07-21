import { getSettings } from "@/lib/supabase/server";

export const contentType = "image/x-icon";
export const revalidate = 3600;

export default async function Icon() {
  const settings = await getSettings();
  const faviconUrl = settings.favicon_url;

  if (!faviconUrl) {
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#16301f"/></svg>`,
      { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" } }
    );
  }

  try {
    const res = await fetch(faviconUrl);
    if (!res.ok) throw new Error("Failed to fetch favicon");
    const buffer = await res.arrayBuffer();
    const ct = res.headers.get("content-type") || "image/png";

    return new Response(buffer, {
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#16301f"/></svg>`,
      { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" } }
    );
  }
}
