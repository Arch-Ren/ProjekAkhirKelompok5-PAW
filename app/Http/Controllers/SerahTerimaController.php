<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSerahTerimaRequest;
use App\Models\Klaim;
use App\Models\SerahTerima;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SerahTerimaController extends Controller
{
    /**
     * Tampilkan daftar serah terima, terbaru di atas.
     */
    public function index(): Response
    {
        $serahTerima = DB::table('serah_terima')
            ->join('klaim', 'serah_terima.id_klaim', '=', 'klaim.id_klaim')
            ->join('barang_temuan', 'klaim.id_barang', '=', 'barang_temuan.id_barang')
            ->join('mahasiswa', 'serah_terima.nim_pengambil', '=', 'mahasiswa.nim')
            ->select(
                'serah_terima.id_serah_terima',
                'serah_terima.nim_pengambil',
                'serah_terima.metode_validasi',
                'serah_terima.waktu_serah_terima',
                'serah_terima.created_at',
                'klaim.id_klaim',
                'klaim.kode_klaim',
                'barang_temuan.deskripsi_singkat',
                'mahasiswa.nama as nama_pengambil',
            )
            ->orderByDesc('serah_terima.waktu_serah_terima')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('SerahTerima/Index', [
            'serahTerima' => $serahTerima,
        ]);
    }

    /**
     * Tampilkan form input serah terima.
     * Hanya klaim berstatus 'Disetujui' yang belum punya serah terima yang ditampilkan.
     */
    public function create(): Response
    {
        $klaimDisetujui = DB::table('klaim')
            ->join('barang_temuan', 'klaim.id_barang', '=', 'barang_temuan.id_barang')
            ->join('mahasiswa', 'klaim.nim_pengklaim', '=', 'mahasiswa.nim')
            ->leftJoin('serah_terima', 'klaim.id_klaim', '=', 'serah_terima.id_klaim')
            ->where('klaim.status_klaim', Klaim::STATUS_DISETUJUI)
            ->whereNull('serah_terima.id_klaim')
            ->select(
                'klaim.id_klaim',
                'klaim.kode_klaim',
                'klaim.nim_pengklaim',
                'barang_temuan.deskripsi_singkat',
                'mahasiswa.nama as nama_pengklaim',
                'mahasiswa.nim as nim_pengklaim_detail',
            )
            ->orderByDesc('klaim.id_klaim')
            ->get();

        return Inertia::render('SerahTerima/Create', [
            'klaimDisetujui'  => $klaimDisetujui,
            'metodeOptions'   => SerahTerima::METODE_OPTIONS,
        ]);
    }

    /**
     * Simpan serah terima baru dalam satu transaksi database.
     */
    public function store(StoreSerahTerimaRequest $request): RedirectResponse
    {
        $serahTerima = DB::transaction(function () use ($request) {
            // Ambil data klaim untuk mendapatkan id_barang
            $klaim = DB::table('klaim')
                ->where('id_klaim', $request->id_klaim)
                ->first();

            // Buat catatan serah terima
            $serahTerima = SerahTerima::create([
                'id_klaim'           => $request->id_klaim,
                'nim_pengambil'      => $request->nim_pengambil,
                'metode_validasi'    => $request->metode_validasi,
                'waktu_serah_terima' => $request->waktu_serah_terima,
            ]);

            // Ubah status klaim menjadi 'Dikembalikan'
            DB::table('klaim')
                ->where('id_klaim', $request->id_klaim)
                ->update(['status_klaim' => Klaim::STATUS_DIKEMBALIKAN]);

            // Ubah status barang temuan menjadi 'Dikembalikan'
            DB::table('barang_temuan')
                ->where('id_barang', $klaim->id_barang)
                ->update(['status_barang' => 'Dikembalikan']);

            return $serahTerima;
        });

        return redirect()->route('serah-terima.show', $serahTerima->id_serah_terima)
            ->with('success', 'Serah terima berhasil dicatat.');
    }

    /**
     * Tampilkan bukti serah terima (siap cetak). Tidak ada edit atau hapus.
     */
    public function show(SerahTerima $serahTerima): Response
    {
        $data = DB::table('serah_terima')
            ->join('klaim', 'serah_terima.id_klaim', '=', 'klaim.id_klaim')
            ->join('barang_temuan', 'klaim.id_barang', '=', 'barang_temuan.id_barang')
            ->join('mahasiswa', 'serah_terima.nim_pengambil', '=', 'mahasiswa.nim')
            ->where('serah_terima.id_serah_terima', $serahTerima->id_serah_terima)
            ->select(
                'serah_terima.id_serah_terima',
                'serah_terima.nim_pengambil',
                'serah_terima.metode_validasi',
                'serah_terima.waktu_serah_terima',
                'serah_terima.created_at',
                'klaim.id_klaim',
                'klaim.kode_klaim',
                'barang_temuan.id_barang',
                'barang_temuan.deskripsi_singkat',
                'barang_temuan.lokasi_ditemukan',
                'barang_temuan.foto_barang',
                'mahasiswa.nama as nama_pengambil',
                'mahasiswa.email as email_pengambil',
            )
            ->first();

        return Inertia::render('SerahTerima/Show', [
            'serahTerima' => $data,
        ]);
    }
}
