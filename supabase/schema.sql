-- Jalankan seluruh file ini di Supabase Dashboard > SQL Editor > New query
-- lalu klik "Run".

-- =========================================
-- 1. Tabel PROGRAMS (kegiatan/program organisasi)
-- =========================================
create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'umum',
  summary text not null,
  content text not null default '',
  cover_image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- =========================================
-- 2. Tabel POSTS (berita / blog)
-- =========================================
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null default '',
  cover_image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- =========================================
-- 3. Tabel GALLERY (galeri foto)
-- =========================================
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

-- =========================================
-- 4. Tabel CONTACT_MESSAGES (pesan dari form kontak)
-- =========================================
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- =========================================
-- 5. Tabel SITE_SETTINGS (pengaturan website)
-- =========================================
create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- Seed default values
insert into site_settings (key, value) values
  ('org_name', 'Akar Harapan'),
  ('org_tagline', ''),
  ('org_description', 'Komunitas warga yang bergerak untuk pendidikan, lingkungan, dan kesejahteraan sosial di lingkungan kita sendiri.'),
  ('org_logo_url', ''),
  ('contact_email', 'halo@akarharapan.org'),
  ('contact_location', 'Bekasi, Jawa Barat'),
  ('contact_instagram', '@akarharapan'),
  ('theme_primary', '#16301f'),
  ('theme_accent', '#e8a63c'),
  ('theme_bg', '#f7f4ec'),
  ('about_heading', 'Dimulai dari obrolan warga di teras rumah, tahun 2019.'),
  ('about_intro', 'Akar Harapan lahir dari kegelisahan sekelompok warga yang melihat makin sedikitnya ruang hijau dan makin banyak anak putus sekolah di lingkungan sekitar. Dari lima orang, kini kami digerakkan oleh lebih dari seratus relawan aktif.'),
  ('about_vision', 'Lingkungan yang tumbuh berkelanjutan, di mana setiap warga punya akses yang setara terhadap pendidikan dan ruang hidup yang sehat.'),
  ('about_missions', '["Menjalankan program pendidikan non-formal untuk anak-anak","Menginisiasi penghijauan dan pengelolaan sampah warga","Membuka ruang gotong royong lintas generasi"]'),
  ('about_team', '[{"name":"Rina Setiawan","role":"Ketua Komunitas","photo_url":""},{"name":"Budi Prakoso","role":"Koordinator Program","photo_url":""},{"name":"Sari Wulandari","role":"Koordinator Relawan","photo_url":""}]'),
  ('favicon_url', ''),
  ('contact_heading', 'Ada pertanyaan atau ajakan kerja sama?'),
  ('contact_description', 'Kirim pesan lewat form di samping, atau hubungi kami langsung melalui kanal berikut.'),
  ('berita_heading', 'Cerita dari lapangan'),
  ('nav_links', '[{"href":"/tentang","label":"Tentang Kami"},{"href":"/program","label":"Program"},{"href":"/berita","label":"Berita"},{"href":"/galeri","label":"Galeri"},{"href":"/kontak","label":"Kontak"}]'),
  ('footer_links', '[{"href":"/tentang","label":"Tentang Kami"},{"href":"/program","label":"Program"},{"href":"/berita","label":"Berita"}]')
on conflict (key) do nothing;

-- =========================================
-- Row Level Security
-- =========================================
alter table programs enable row level security;
alter table posts enable row level security;
alter table gallery_items enable row level security;
alter table contact_messages enable row level security;
alter table site_settings enable row level security;

-- Publik boleh MEMBACA konten yang published (programs, posts, gallery)
drop policy if exists "public_read_published_programs" on programs;
create policy "public_read_published_programs" on programs
  for select using (is_published = true);

drop policy if exists "public_read_published_posts" on posts;
create policy "public_read_published_posts" on posts
  for select using (is_published = true);

drop policy if exists "public_read_gallery" on gallery_items;
create policy "public_read_gallery" on gallery_items
  for select using (true);

-- Publik boleh MEMBACA semua settings
drop policy if exists "public_read_settings" on site_settings;
create policy "public_read_settings" on site_settings
  for select using (true);

-- Publik boleh MENGIRIM pesan kontak
drop policy if exists "public_insert_contact" on contact_messages;
create policy "public_insert_contact" on contact_messages
  for insert with check (true);

-- Admin (user yang sudah login) boleh melakukan semuanya
drop policy if exists "admin_all_programs" on programs;
create policy "admin_all_programs" on programs
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_posts" on posts;
create policy "admin_all_posts" on posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_gallery" on gallery_items;
create policy "admin_all_gallery" on gallery_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_settings" on site_settings;
create policy "admin_all_settings" on site_settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_read_contact" on contact_messages;
create policy "admin_read_contact" on contact_messages
  for select using (auth.role() = 'authenticated');

drop policy if exists "admin_update_contact" on contact_messages;
create policy "admin_update_contact" on contact_messages
  for update using (auth.role() = 'authenticated');

drop policy if exists "admin_delete_contact" on contact_messages;
create policy "admin_delete_contact" on contact_messages
  for delete using (auth.role() = 'authenticated');

-- =========================================
-- Storage bucket untuk gambar (jalankan sekali)
-- =========================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public_read_media" on storage.objects;
create policy "public_read_media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "admin_upload_media" on storage.objects;
create policy "admin_upload_media" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "admin_delete_media" on storage.objects;
create policy "admin_delete_media" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
