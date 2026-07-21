import { getSettings } from "@/lib/supabase/server";
import { updateSettings } from "@/lib/admin-actions";
import TeamMembersField from "@/components/admin/TeamMembersField";
import KeyValuePairsField from "@/components/admin/KeyValuePairsField";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Pengaturan
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        Kelola identitas organisasi, kontak, dan tema website.
      </p>

      <form action={updateSettings} className="mt-8 space-y-10">
        {/* Identitas Organisasi */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Identitas Organisasi
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Nama Organisasi
              </label>
              <input
                name="org_name"
                defaultValue={settings.org_name}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Tagline
              </label>
              <input
                name="org_tagline"
                defaultValue={settings.org_tagline}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-ink-soft">
              Deskripsi Singkat
            </label>
            <textarea
              name="org_description"
              rows={3}
              defaultValue={settings.org_description}
              className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-ink-soft">
              URL Logo
            </label>
            <input
              name="org_logo_url"
              defaultValue={settings.org_logo_url}
              placeholder="https://..."
              className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
            />
            <p className="mt-1 text-xs text-ink-soft">
              Upload gambar ke Galeri, lalu paste URL publik-nya di sini.
            </p>
          </div>
        </section>

        {/* Kontak */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Kontak & Sosial Media
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Email
              </label>
              <input
                name="contact_email"
                type="email"
                defaultValue={settings.contact_email}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Lokasi
              </label>
              <input
                name="contact_location"
                defaultValue={settings.contact_location}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Instagram
              </label>
              <input
                name="contact_instagram"
                defaultValue={settings.contact_instagram}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Tema */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Tema Warna
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Pilih warna utama, aksen, dan latar belakang website.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Warna Utama
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  name="theme_primary"
                  type="color"
                  defaultValue={settings.theme_primary}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-forest-800/15"
                />
                <span className="font-mono text-xs text-ink-soft">
                  {settings.theme_primary}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Warna Aksen
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  name="theme_accent"
                  type="color"
                  defaultValue={settings.theme_accent}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-forest-800/15"
                />
                <span className="font-mono text-xs text-ink-soft">
                  {settings.theme_accent}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Warna Latar
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  name="theme_bg"
                  type="color"
                  defaultValue={settings.theme_bg}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-forest-800/15"
                />
                <span className="font-mono text-xs text-ink-soft">
                  {settings.theme_bg}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tentang Kami */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Tentang Kami
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Kelola konten halaman &quot;Tentang Kami&quot;.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Judul Utama
              </label>
              <input
                name="about_heading"
                defaultValue={settings.about_heading}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Paragraf Pengantar
              </label>
              <textarea
                name="about_intro"
                rows={3}
                defaultValue={settings.about_intro}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Visi
              </label>
              <textarea
                name="about_vision"
                rows={3}
                defaultValue={settings.about_vision}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Misi (satu per baris)
              </label>
              <textarea
                name="about_missions"
                rows={4}
                defaultValue={(() => {
                  try {
                    const arr = JSON.parse(settings.about_missions);
                    return Array.isArray(arr) ? arr.join("\n") : "";
                  } catch {
                    return "";
                  }
                })()}
                placeholder={"Menjalankan program pendidikan\nMenginisiasi penghijauan\nMembuka ruang gotong royong"}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
              <p className="mt-1 text-xs text-ink-soft">
                Ketik satu misi per baris. Akan disimpan otomatis sebagai daftar.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Pengurus Inti
              </label>
              <TeamMembersField defaultValue={settings.about_team} />
            </div>
          </div>
        </section>

        {/* Favicon */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Favicon
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Ikon yang muncul di tab browser.
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-ink-soft">
              URL Favicon
            </label>
            <input
              name="favicon_url"
              defaultValue={settings.favicon_url}
              placeholder="https://..."
              className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
            />
            <p className="mt-1 text-xs text-ink-soft">
              Upload gambar ke Galeri, lalu paste URL publik-nya di sini.
              Disarankan ukuran 32x32px.
            </p>
          </div>
        </section>

        {/* Background Home Page */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Background Home Page
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Gambar latar belakang halaman utama website.
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-ink-soft">
              URL Gambar
            </label>
            <input
              name="home_bg_url"
              defaultValue={settings.home_bg_url}
              placeholder="https://..."
              className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
            />
            <p className="mt-1 text-xs text-ink-soft">
              Upload gambar ke Galeri, lalu paste URL publik-nya di sini.
              Disarankan ukuran 1920x1080px atau lebih besar.
            </p>
            {settings.home_bg_url && (
              <img
                src={settings.home_bg_url}
                alt="Preview"
                className="mt-3 h-32 w-full rounded-lg object-cover"
              />
            )}
          </div>
        </section>

        {/* Halaman Kontak */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Halaman Kontak
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Kelola konten halaman &quot;Kontak&quot;.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Judul
              </label>
              <input
                name="contact_heading"
                defaultValue={settings.contact_heading}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Deskripsi
              </label>
              <textarea
                name="contact_description"
                rows={3}
                defaultValue={settings.contact_description}
                className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Halaman Berita */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Halaman Berita
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Kelola judul halaman berita.
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-ink-soft">
              Judul
            </label>
            <input
              name="berita_heading"
              defaultValue={settings.berita_heading}
              className="mt-1 w-full rounded-lg border border-forest-800/15 bg-paper px-4 py-2.5 text-sm"
            />
          </div>
        </section>

        {/* Navigasi */}
        <section className="rounded-2xl border border-forest-800/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-forest-900">
            Navigasi
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Kelola link navigasi di navbar dan footer.
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-ink-soft">
                Navbar Links
              </label>
              <KeyValuePairsField
                name="nav_links"
                defaultValue={settings.nav_links}
                keyLabel="href (misal: /tentang)"
                valueLabel="Label (misal: Tentang Kami)"
              />
            </div>
            <div className="border-t border-forest-800/10 pt-6">
              <label className="block text-sm font-medium text-ink-soft">
                Footer Links
              </label>
              <KeyValuePairsField
                name="footer_links"
                defaultValue={settings.footer_links}
                keyLabel="href (misal: /tentang)"
                valueLabel="Label (misal: Tentang Kami)"
              />
            </div>
          </div>
        </section>

        <div>
          <button
            type="submit"
            className="rounded-full bg-forest-800 px-8 py-3 font-body text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            Simpan Pengaturan
          </button>
        </div>
      </form>
    </div>
  );
}
