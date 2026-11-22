<?php

namespace Database\Seeders;

use App\Models\SerahTerima;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class SerahTerimaSeeder extends Seeder
{
    /**
     * Seed data contoh serah terima.
     *
     * Bergantung pada tabel klaim dan barang_temuan.
     * Jalankan setelah KlaimSeeder dan BarangTemuanSeeder.
     */
    public function run(): void
    {
        // Pastikan tabel dependensi sudah ada isinya
        // Gunakan ID statis yang diasumsikan ada dari seeder lain
        // Jika seeder lain belum siap, seeder ini akan di-skip

        if (
            !\Illuminate\Support\Facades\Schema::hasTable('klaim') ||
            !\Illuminate\Support\Facades\Schema::hasTable('barang_temuan')
        ) {
            $this->command->warn('Tabel klaim atau barang_temuan belum ada. SerahTerimaSeeder dilewati.');
            return;
        }

        $klaimCount = \Illuminate\Support\Facades\DB::table('klaim')->count();
        $barangCount = \Illuminate\Support\Facades\DB::table('barang_temuan')->count();

        if ($klaimCount === 0 || $barangCount === 0) {
            $this->command->warn('Data klaim atau barang_temuan kosong. SerahTerimaSeeder dilewati.');
            return;
        }

        // Ambil klaim berstatus 'disetujui' yang belum punya serah terima
        $klaimDisetujui = \Illuminate\Support\Facades\DB::table('klaim')
            ->where('status', 'disetujui')
            ->whereNotIn('id', function ($query) {
                $query->select('klaim_id')->from('serah_terima');
            })
            ->get();

        if ($klaimDisetujui->isEmpty()) {
            $this->command->warn('Tidak ada klaim disetujui yang belum punya serah terima. SerahTerimaSeeder dilewati.');
            return;
        }

        $adminId = \Illuminate\Support\Facades\DB::table('users')->value('id');

        foreach ($klaimDisetujui->take(3) as $index => $klaim) {
            SerahTerima::create([
                'klaim_id'        => $klaim->id,
                'barang_temuan_id' => $klaim->barang_temuan_id,
                'user_id'         => $adminId,
                'nama_pengambil'  => $klaim->nama_pengklaim,
                'nim_pengambil'   => $klaim->nim,
                'metode'          => $index % 2 === 0
                    ? SerahTerima::METODE_QR_FORM
                    : SerahTerima::METODE_KTM,
                'waktu_serah'     => Carbon::now()->subDays(3 - $index),
                'catatan'         => $index === 0
                    ? 'Barang diterima dalam kondisi baik.'
                    : null,
            ]);

            // Ubah status barang menjadi 'dikembalikan'
            \Illuminate\Support\Facades\DB::table('barang_temuan')
                ->where('id', $klaim->barang_temuan_id)
                ->update(['status' => 'dikembalikan']);
        }

        $this->command->info('SerahTerimaSeeder: ' . min(3, $klaimDisetujui->count()) . ' data serah terima berhasil dibuat.');
    }
}
