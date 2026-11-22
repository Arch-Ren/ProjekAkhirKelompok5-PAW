<?php

namespace App\Http\Controllers;

use App\Http\Requests\LaporanKehilanganRequest;
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
            ->when($request->q, fn ($query, $q) => $query->where(fn ($sub) => $sub
                ->where('deskripsi_barang_hilang', 'like', "%{$q}%")
                ->orWhere('nama_pelapor', 'like', "%{$q}%")))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('LaporanKehilangan/Index', [
            'laporan' => $laporan,
            'filters' => $request->only('q'),
            'success' => session('success'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('LaporanKehilangan/Create');
    }

    public function store(LaporanKehilanganRequest $request): RedirectResponse
    {
        LaporanKehilangan::create([
            ...$request->validated(),
            'tanggal_lapor' => now()->toDateString(),
        ]);

        return redirect()->route('laporan-kehilangan.index')
            ->with('success', 'Laporan kehilangan berhasil ditambahkan.');
    }

    public function show(LaporanKehilangan $laporanKehilangan): Response
    {
        // shortcut: daftar barang temuan yang mirip belum ditampilkan, tambahkan setelah model BarangTemuan (BNA) masuk
        return Inertia::render('LaporanKehilangan/Show', [
            'laporan' => $laporanKehilangan,
            'success' => session('success'),
        ]);
    }

    public function edit(LaporanKehilangan $laporanKehilangan): Response
    {
        return Inertia::render('LaporanKehilangan/Edit', [
            'laporan' => $laporanKehilangan,
        ]);
    }

    public function update(LaporanKehilanganRequest $request, LaporanKehilangan $laporanKehilangan): RedirectResponse
    {
        $laporanKehilangan->update($request->validated());

        return redirect()->route('laporan-kehilangan.show', $laporanKehilangan)
            ->with('success', 'Laporan kehilangan berhasil diperbarui.');
    }

    public function destroy(LaporanKehilangan $laporanKehilangan): RedirectResponse
    {
        $laporanKehilangan->delete();

        return redirect()->route('laporan-kehilangan.index')
            ->with('success', 'Laporan kehilangan berhasil dihapus.');
    }
}
