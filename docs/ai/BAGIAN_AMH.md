# Bagian AMH: CRUD Akun Admin, Serah Terima, Dashboard, Profil

Baca `CLAUDE.md` di root lebih dulu. Skema, route, dan konvensi mengikuti file itu.

## Fitur saya
- **2.9 CRUD Akun Admin:** lihat, tambah, ubah, hapus akun admin (nama, email, kata
  sandi).
- **2.9 Serah Terima:** HANYA Create dan Read, agar bukti penyerahan tidak bisa diubah.
  Saat serah terima dicatat, status barang menjadi `dikembalikan`.
- **2.3 Dashboard/Home (bersama BNA):** usulan pembagian, saya membuat ringkasan klaim
  berstatus `menunggu`, lima serah terima terbaru, dan menu navigasi ke halaman
  pengelolaan.
- **2.4 Halaman Profil (bersama MH):** usulan pembagian, saya membuat form ubah kata
  sandi. MH membuat ubah data diri.

## Tabel yang saya miliki
`serah_terima` (kolom lengkap di `CLAUDE.md`). CRUD Akun Admin memakai tabel `users`.
Bergantung pada `klaim` (MDFS) dan `barang_temuan` (BNA). Pakai seeder data contoh
sampai modul mereka siap.

## Alur layar (admin)
Akun admin:
1. `akun-admin.index`: tabel admin. 2. `create` dan `edit`: form. 3. `destroy`: dengan
   konfirmasi.

Serah terima:
1. `serah-terima.index`: daftar serah terima, terbaru di atas.
2. `serah-terima.create`: pilih klaim berstatus `disetujui` yang belum punya serah
   terima, lalu isi data pengambil dari hasil scan QR (Google Form) atau scan KTM.
3. Setelah simpan: halaman `show` sebagai bukti, bisa dicetak. Tidak ada tombol edit
   atau hapus.

## Aturan dan validasi
- Route: `Route::resource('serah-terima', SerahTerimaController::class)->only(['index','create','store','show']);`
- Serah terima: `klaim_id` required, exists, unique:serah_terima, dan klaimnya harus
  `disetujui`; `nama_pengambil` required max:100; `nim_pengambil` required;
  `metode` required in:qr_form,ktm; `waktu_serah` required date; `catatan` nullable.
- Simpan dalam `DB::transaction`: buat baris `serah_terima` (isi `barang_temuan_id` dari
  klaim, `user_id` = admin login), lalu ubah barang menjadi `dikembalikan`. Pakai
  konstanta status dari model `BarangTemuan`.
- Akun admin: `name` required; `email` required email unique (abaikan id sendiri saat
  edit); `password` required min:8 confirmed saat tambah, nullable saat edit. Simpan
  dengan `Hash::make`.
- Admin tidak boleh menghapus akunnya sendiri, dan akun admin terakhir tidak boleh
  dihapus.
- Ubah kata sandi di profil: wajib isi kata sandi lama (`current_password`).

## File yang kemungkinan saya buat
- `app/Http/Controllers/AkunAdminController.php`, `SerahTerimaController.php`
- `app/Models/SerahTerima.php`
- `app/Http/Requests/StoreSerahTerimaRequest.php`, `StoreAkunAdminRequest.php`,
  `UpdateAkunAdminRequest.php`
- `resources/views/akun-admin/`, `resources/views/serah-terima/`, bagian ringkasan di
  `resources/views/dashboard.blade.php`, form kata sandi di `resources/views/profile/`
- Migration `serah_terima` dan `SerahTerimaSeeder`

## Koordinasi dengan anggota lain
- MDFS: tambah admin di Akun Admin dan halaman Register sebaiknya memakai validasi yang
  sama. Sepakati satu tempat untuk logika pembuatan akun.
- BNA: tata letak dashboard dan konstanta status barang.
- MH: pembagian halaman profil.
