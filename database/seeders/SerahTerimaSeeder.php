<?php

namespace Database\Seeders;

use App\Models\Klaim;
use App\Models\SerahTerima;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SerahTerimaSeeder extends Seeder
{
    /**
     * Seed data contoh serah terima.
     *
     * Bergantung pada tabel klaim, barang_temuan, dan mahasiswa.
     */
    public function run(): void
    {
        if (
            !Schema::hasTable('klaim') ||
            !Schema::hasTable('barang_temuan') ||
            !Schema::hasTable('mahasiswa') ||
            !Schema::hasTable('serah_terima')
        ) {
            $this->command->warn('Tabel dependensi belum lengkap. SerahTerimaSeeder dilewati.');
            return;
        }

        // Ambil klaim berstatus 'Disetujui' yang belum punya serah terima
        $klaimDisetujui = DB::table('klaim')
            ->where('status_klaim', Klaim::STATUS_DISETUJUI)
            ->whereNotIn('id_klaim', function ($query) {
                $query->select('id_klaim')->from('serah_terima');
            })
            ->get();

        if ($klaimDisetujui->isEmpty()) {
            $this->command->warn('Tidak ada klaim disetujui yang belum punya serah terima. SerahTerimaSeeder dilewati.');
            return;
        }

        foreach ($klaimDisetujui->take(3) as $index => $klaim) {
            SerahTerima::create([
                'id_klaim'           => $klaim->id_klaim,
                'nim_pengambil'      => $klaim->nim_pengklaim,
                'metode_validasi'    => $index % 2 === 0
                    ? SerahTerima::METODE_QR_FORM
                    : SerahTerima::METODE_KTM,
                'waktu_serah_terima' => Carbon::now()->subDays(3 - $index),
            ]);

            // Ubah status barang menjadi 'Dikembalikan' dan status klaim menjadi 'Dikembalikan'
            DB::table('barang_temuan')
                ->where('id_barang', $klaim->id_barang)
                ->update(['status_barang' => 'Dikembalikan']);

            DB::table('klaim')
                ->where('id_klaim', $klaim->id_klaim)
                ->update(['status_klaim' => Klaim::STATUS_DIKEMBALIKAN]);
        }

        $this->command->info('SerahTerimaSeeder: ' . min(3, $klaimDisetujui->count()) . ' data serah terima berhasil dibuat.');
    }
}
