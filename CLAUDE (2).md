# Project Akhir PAW: Lost and Found FILKOM (Kelompok 5, kelas C)

File ini adalah konteks UMUM yang sama untuk keempat anggota. Letakkan di root project
(sejajar `artisan`) dan commit ke repository.

## Wajib dibaca AI di awal sesi
1. Tanyakan inisial pengguna (MDFS, BNA, MH, atau AMH) jika belum disebut.
2. Baca file bagian orang itu: `docs/ai/BAGIAN_<INISIAL>.md`.
3. Kerjakan hanya bagian milik inisial itu. Untuk file milik anggota lain atau file
   bersama (lihat "Kepemilikan file"), jelaskan perubahan yang diusulkan dan tunggu
   persetujuan sebelum mengubah.
4. Jangan mengarang nama tabel, kolom, status, atau route di luar file ini. Jika butuh
   kolom atau route baru, usulkan dulu dan minta pengguna menyepakatinya dengan kelompok,
   lalu perbarui file ini.
5. Jawab dalam bahasa Indonesia. Jelaskan kode secukupnya, karena kontribusi dinilai per
   anggota dan bisa ditanyakan asisten. Berikan perintah dalam blok kode.
6. Jangan menulis password, API key, atau isi `.env` ke file yang di-commit.

## Ringkasan project
- Mata kuliah Pengembangan Aplikasi Web, kelas C. Dosen: Ir. Wibisono Sukmo Wardhono,
  S.T., M.T. Laravel wajib.
- Website untuk mengelola barang temuan dan barang hilang di FILKOM UB, menggantikan buku
  besar kertas di pos keamanan Gedung F lantai 1.
- Repository: https://github.com/Arch-Ren/ProjekAkhirKelompok5-PAW
- Anggota: MDFS (Muhammad Diego Febrigas Saputra), BNA (Brian Naufal Athailla),
  MH (Muhammad Hanif), AMH (Afghani Musthafa Hanif).
- Rancangan sistem diturunkan dari tugas DPSI kelompok yang sama (BPMN, SKPL, DFD, CDM,
  PDM, Desain OOP).

## Aktor dan aturan bisnis
- **Satpam (admin):** satu-satunya pengguna yang login. Mencatat barang temuan, mengelola
  laporan kehilangan, memverifikasi klaim, mencatat serah terima, mengelola akun admin.
- **Mahasiswa (pemilik barang):** tidak login (usulan, lihat Keputusan terbuka). Melihat
  katalog publik, mengajukan klaim, mengecek status klaim.
- **Penemu (cleaning service atau mahasiswa):** tidak login. Datanya dicatat satpam.
- Halaman publik TIDAK menampilkan data penemu dan `ciri_khusus` barang.
- Satu barang hanya boleh punya satu klaim berstatus `disetujui`.
- Pengambilan barang tetap di pos. Data pengambil dari scan QR (Google Form) atau scan
  KTM, lalu diinput satpam ke form serah terima.
- Serah terima hanya Create dan Read. Tidak ada edit atau hapus.
- Barang yang sudah punya klaim tidak dihapus permanen, cukup diarsipkan.

## Alur utama
1. Satpam mencatat barang temuan → status `disimpan` → tampil di katalog.
2. Mahasiswa melihat katalog → mengajukan klaim (ciri dan foto bukti) → status klaim
   `menunggu` → mendapat `kode_klaim` untuk cek status.
3. Satpam memverifikasi → klaim `disetujui` (barang menjadi `diklaim`) atau `ditolak`.
   Email dikirim ke pengklaim.
4. Pemilik datang ke pos → satpam mencatat serah terima → barang menjadi `dikembalikan`.

## Teknologi
Laravel (versi: isi hasil `php artisan --version`), PHP, MySQL, Blade, Tailwind (bawaan
Breeze), Vite, Laravel Breeze untuk autentikasi admin, Git dan GitHub, Google Form.

## Skema database (USULAN, sepakati sebelum membuat migration)
Tipe ditulis dengan nama method Blueprint Laravel. Kolom status memakai `string` dengan
nilai di bawah, bukan `enum` MySQL, agar mudah diubah.

**users** (akun admin, bawaan Breeze) — pemilik: MDFS (auth), AMH (CRUD)
- `id`, `name`, `email` unique, `password`, `remember_token`, `timestamps`

**penemu** — pemilik: BNA
- `id`, `nama` string, `status` string (`cleaning_service`, `mahasiswa`),
  `kontak` string nullable, `timestamps`

**barang_temuan** — pemilik: BNA
- `id`, `user_id` foreignId → users (admin pencatat), `penemu_id` foreignId → penemu
- `nama_barang` string, `deskripsi` text (publik), `ciri_khusus` text nullable (privat)
- `kategori` string, `lokasi` string, `waktu_ditemukan` dateTime, `foto` string nullable
- `status` string default `disimpan` (`disimpan`, `diklaim`, `dikembalikan`)
- `diarsipkan` boolean default false, `timestamps`

**laporan_kehilangan** — pemilik: MH
- `id`, `user_id` foreignId → users (admin pencatat)
- `nama_pelapor` string, `kontak_pelapor` string
- `nama_barang` string, `kategori` string, `ciri_ciri` text, `lokasi_terakhir` string,
  `waktu_hilang` dateTime
- `status` string default `aktif` (`aktif`, `ditemukan`, `ditutup`), `timestamps`

**klaim** — pemilik: MDFS
- `id`, `barang_temuan_id` foreignId → barang_temuan,
  `laporan_kehilangan_id` foreignId nullable → laporan_kehilangan
- `kode_klaim` string unique, `nama_pengklaim` string, `nim` string, `email` string
- `deskripsi_ciri` text, `foto_bukti` string nullable
- `status` string default `menunggu` (`menunggu`, `disetujui`, `ditolak`, `dibatalkan`)
- `diverifikasi_oleh` foreignId nullable → users, `diverifikasi_pada` dateTime nullable,
  `catatan_admin` text nullable, `timestamps`

**serah_terima** — pemilik: AMH
- `id`, `klaim_id` foreignId unique → klaim, `barang_temuan_id` foreignId → barang_temuan,
  `user_id` foreignId → users (petugas)
- `nama_pengambil` string, `nim_pengambil` string, `metode` string (`qr_form`, `ktm`)
- `waktu_serah` dateTime, `catatan` text nullable, `timestamps`

Relasi Eloquent: Penemu hasMany BarangTemuan; BarangTemuan hasMany Klaim, hasOne
SerahTerima; LaporanKehilangan hasMany Klaim; Klaim belongsTo BarangTemuan, hasOne
SerahTerima.

Urutan migration (harus berurutan karena foreign key): users → penemu → barang_temuan →
laporan_kehilangan → klaim → serah_terima.

Daftar `kategori` dan `lokasi` disimpan di `config/lostfound.php` agar semua form dan
filter memakai daftar yang sama. Usulan kategori: Elektronik, Dokumen dan Kartu, Dompet
dan Tas, Pakaian, Aksesoris, Alat Tulis, Lainnya.

## Route dan hak akses (USULAN)
| Route | Akses | Pemilik |
|---|---|---|
| `GET /` dan `GET /katalog` | publik | BNA, MH |
| `GET /katalog/{barangTemuan}` | publik (tanpa data penemu, tanpa ciri khusus) | MH |
| `GET/POST /klaim/ajukan/{barangTemuan}` | publik | MDFS |
| `GET /klaim/cek` (masukkan `kode_klaim`), `PATCH /klaim/{kode}/batal` | publik | MDFS |
| `GET/POST /login`, `POST /logout` | tamu / admin | MDFS |
| `GET/POST /register` | admin saja (lihat Keputusan terbuka) | MDFS |
| `GET /dashboard` | admin | BNA, AMH |
| `/profile` | admin | MH, AMH |
| `Route::resource('barang-temuan', ...)` | admin | BNA |
| `Route::resource('laporan-kehilangan', ...)` | admin | MH |
| `GET /admin/klaim`, `GET /admin/klaim/{klaim}`, `PATCH .../setujui`, `PATCH .../tolak` | admin | MDFS |
| `Route::resource('akun-admin', ...)` | admin | AMH |
| `Route::resource('serah-terima', ...)->only(['index','create','store','show'])` | admin | AMH |

Semua route admin berada di dalam `Route::middleware('auth')->group(...)`.

## Konvensi kode
- Nama: tabel snake_case tunggal bahasa Indonesia (tetapkan `protected $table` di model),
  model PascalCase (`BarangTemuan`), controller `BarangTemuanController`, folder view
  kebab-case (`resources/views/barang-temuan/`), route name sesuai resource
  (`barang-temuan.index`).
- Nilai status disimpan sebagai konstanta di model, contoh
  `BarangTemuan::STATUS_DISIMPAN = 'disimpan'`. Jangan menulis string status langsung di
  controller atau view.
- Validasi memakai Form Request (`app/Http/Requests/`). Pesan error dalam bahasa Indonesia.
- Layout: `layouts/app.blade.php` untuk halaman admin (Breeze), `layouts/public.blade.php`
  untuk halaman publik. Pesan sukses lewat `session('success')`, ditampilkan di layout.
- Upload file disimpan di disk `public` (`storage/app/public/...`), jalankan
  `php artisan storage:link`. Folder: `barang/`, `klaim/`.
- Perubahan status yang menyentuh lebih dari satu tabel dilakukan dalam `DB::transaction`.
- Teks antarmuka berbahasa Indonesia.

## Kepemilikan file
- File bersama (ubah hanya setelah memberi tahu kelompok): `routes/web.php`,
  `resources/views/layouts/*`, navigasi, `config/lostfound.php`,
  `database/seeders/DatabaseSeeder.php`, file migration milik orang lain, file ini.
- File bagian: lihat `docs/ai/BAGIAN_<INISIAL>.md` masing-masing.

## Fondasi bersama (kerjakan pertama)
Agar tidak saling menunggu, buat satu pull request fondasi berisi semua migration, model
dengan relasi dan konstanta status, `config/lostfound.php`, dan seeder data contoh untuk
keenam tabel. Setelah fondasi masuk `main`, tiap anggota mengerjakan controller dan view
bagiannya secara paralel.

## Keputusan terbuka (sepakati, lalu perbarui file ini dan hapus barisnya)
- Apakah mahasiswa login? Usulan di file ini: tidak. Klaim diajukan lewat form publik,
  status dicek dengan `kode_klaim`. Jika mahasiswa login, skema `klaim` dan route berubah.
- Register (MDFS) dan CRUD Akun Admin (AMH) sama-sama membuat akun admin. Usulan: route
  register Breeze dibatasi untuk admin yang sudah login, dan halaman tambah di Akun Admin
  memanggil logika yang sama.
- Pembagian kerja fitur bersama (Dashboard, Profil, Katalog): usulan ada di file bagian.
- Versi Laravel, layanan hosting, dan apakah email memakai SMTP sungguhan atau cukup
  `MAIL_MAILER=log`.
