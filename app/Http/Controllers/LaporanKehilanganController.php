<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLaporanKehilanganRequest;
use App\Http\Requests\UpdateLaporanKehilanganRequest;
use App\Models\LaporanKehilangan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LaporanKehilanganController extends Controller
{
    public function index(Request $request): Response
    {
        $laporan = LaporanKehilangan::query()
            ->when($request->q, fn ($query, $q) => $query->where('nama_barang', 'like', "%{$q}%"))
            ->when($request->status, fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('LaporanKehilangan/Index', [
            'laporan' => $laporan,
            'filters' => $request->only('q', 'status'),
            'statusList' => LaporanKehilangan::STATUS,
            'success' => session('success'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('LaporanKehilangan/Create', [
            'kategoriList' => config('lostfound.kategori'),
        ]);
    }

    public function store(StoreLaporanKehilanganRequest $request): RedirectResponse
    {
        LaporanKehilangan::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('laporan-kehilangan.index')
            ->with('success', 'Laporan kehilangan berhasil ditambahkan.');
    }

    public function show(LaporanKehilangan $laporanKehilangan): Response
    {
        // shortcut: daftar barang temuan yang mirip belum ditampilkan karena tabel barang_temuan (BNA) belum ada, tambahkan setelah fondasi masuk
        return Inertia::render('LaporanKehilangan/Show', [
            'laporan' => $laporanKehilangan->load('user:id,name'),
            'success' => session('success'),
        ]);
    }

    public function edit(LaporanKehilangan $laporanKehilangan): Response
    {
        return Inertia::render('LaporanKehilangan/Edit', [
            'laporan' => $laporanKehilangan,
            'kategoriList' => config('lostfound.kategori'),
            'statusList' => LaporanKehilangan::STATUS,
        ]);
    }

    public function update(UpdateLaporanKehilanganRequest $request, LaporanKehilangan $laporanKehilangan): RedirectResponse
    {
        $laporanKehilangan->update($request->validated());

        return redirect()->route('laporan-kehilangan.show', $laporanKehilangan)
            ->with('success', 'Laporan kehilangan berhasil diperbarui.');
    }

    public function destroy(LaporanKehilangan $laporanKehilangan): RedirectResponse
    {
        // shortcut: belum menolak hapus jika laporan sudah ditautkan ke klaim karena tabel klaim (MDFS) belum ada, tambahkan setelah fondasi masuk
        $laporanKehilangan->delete();

        return redirect()->route('laporan-kehilangan.index')
            ->with('success', 'Laporan kehilangan berhasil dihapus.');
    }
}
