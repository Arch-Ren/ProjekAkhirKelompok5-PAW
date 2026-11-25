<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Tampilkan halaman dashboard admin (bagian AMH).
     */
    public function __invoke(): Response
    {
        $klaimMenunggu = 0;
        if (Schema::hasTable('klaim')) {
            $klaimMenunggu = DB::table('klaim')
                ->where('status_klaim', 'Diajukan')
                ->count();
        }

        $serahTerimaTerbaru = [];
        if (
            Schema::hasTable('serah_terima') &&
            Schema::hasTable('klaim') &&
            Schema::hasTable('barang_temuan') &&
            Schema::hasTable('mahasiswa')
        ) {
            $canShowSerahTerima = Route::has('serah-terima.show');

            $serahTerimaTerbaru = DB::table('serah_terima')
                ->join('klaim', 'serah_terima.id_klaim', '=', 'klaim.id_klaim')
                ->join('barang_temuan', 'klaim.id_barang', '=', 'barang_temuan.id_barang')
                ->join('mahasiswa', 'serah_terima.nim_pengambil', '=', 'mahasiswa.nim')
                ->select(
                    'serah_terima.id_serah_terima',
                    'serah_terima.nim_pengambil',
                    'serah_terima.metode_validasi',
                    'serah_terima.waktu_serah_terima',
                    'klaim.kode_klaim',
                    'barang_temuan.deskripsi_singkat',
                    'mahasiswa.nama as nama_pengambil',
                )
                ->orderByDesc('serah_terima.waktu_serah_terima')
                ->limit(5)
                ->get()
                ->map(function ($item) use ($canShowSerahTerima) {
                    $item->show_url = $canShowSerahTerima
                        ? route('serah-terima.show', $item->id_serah_terima)
                        : null;

                    return $item;
                });
        }

        return Inertia::render('Dashboard', [
            'klaimMenunggu'      => $klaimMenunggu,
            'serahTerimaTerbaru' => $serahTerimaTerbaru,
            'links'              => [
                'akunAdmin'         => Route::has('akun-admin.index') ? route('akun-admin.index') : null,
                'serahTerima'       => Route::has('serah-terima.index') ? route('serah-terima.index') : null,
                'serahTerimaCreate' => Route::has('serah-terima.create') ? route('serah-terima.create') : null,
                'klaim'             => Route::has('admin.klaim.index') ? route('admin.klaim.index') : null,
                'barangTemuan'      => Route::has('barang-temuan.index') ? route('barang-temuan.index') : null,
                'laporanKehilangan' => Route::has('laporan-kehilangan.index') ? route('laporan-kehilangan.index') : null,
                'profil'            => Route::has('profile.edit') ? route('profile.edit') : null,
            ],
        ]);
    }
}
