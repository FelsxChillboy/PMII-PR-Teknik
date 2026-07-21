import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const DEFAULT_SETTINGS: Record<string, string> = {
  org_name: "Akar Harapan",
  org_tagline: "",
  org_description:
    "Komunitas warga yang bergerak untuk pendidikan, lingkungan, dan kesejahteraan sosial di lingkungan kita sendiri.",
  org_logo_url: "",
  contact_email: "halo@akarharapan.org",
  contact_location: "Bekasi, Jawa Barat",
  contact_instagram: "@akarharapan",
  theme_primary: "#16301f",
  theme_accent: "#e8a63c",
  theme_bg: "#f7f4ec",
  about_heading: "Dimulai dari obrolan warga di teras rumah, tahun 2019.",
  about_intro:
    "Akar Harapan lahir dari kegelisahan sekelompok warga yang melihat makin sedikitnya ruang hijau dan makin banyak anak putus sekolah di lingkungan sekitar. Dari lima orang, kini kami digerakkan oleh lebih dari seratus relawan aktif.",
  about_vision:
    "Lingkungan yang tumbuh berkelanjutan, di mana setiap warga punya akses yang setara terhadap pendidikan dan ruang hidup yang sehat.",
  about_missions:
    '["Menjalankan program pendidikan non-formal untuk anak-anak","Menginisiasi penghijauan dan pengelolaan sampah warga","Membuka ruang gotong royong lintas generasi"]',
  about_team:
    '[{"name":"Rina Setiawan","role":"Ketua Komunitas","photo_url":""},{"name":"Budi Prakoso","role":"Koordinator Program","photo_url":""},{"name":"Sari Wulandari","role":"Koordinator Relawan","photo_url":""}]',
  favicon_url: "",
  contact_heading: "Ada pertanyaan atau ajakan kerja sama?",
  contact_description:
    "Kirim pesan lewat form di samping, atau hubungi kami langsung melalui kanal berikut.",
  berita_heading: "Cerita dari lapangan",
  nav_links:
    '[{"href":"/tentang","label":"Tentang Kami"},{"href":"/program","label":"Program"},{"href":"/berita","label":"Berita"},{"href":"/galeri","label":"Galeri"},{"href":"/kontak","label":"Kontak"}]',
  footer_links:
    '[{"href":"/tentang","label":"Tentang Kami"},{"href":"/program","label":"Program"},{"href":"/berita","label":"Berita"}]',
  home_bg_url: "",
};

export async function getSettings(): Promise<Record<string, string>> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("key, value");
    if (!data) return DEFAULT_SETTINGS;
    const map = { ...DEFAULT_SETTINGS };
    for (const row of data) map[row.key] = row.value;
    return map;
  } catch (err) {
    console.error("[getSettings] Error:", err);
    return DEFAULT_SETTINGS;
  }
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component that can't set cookies.
            // Safe to ignore because middleware refreshes sessions.
          }
        },
      },
    }
  );
}
