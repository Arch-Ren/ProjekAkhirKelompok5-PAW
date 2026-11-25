<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAkunAdminRequest;
use App\Http\Requests\UpdateAkunAdminRequest;
use App\Models\AkunAdmin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AkunAdminController extends Controller
{
    /**
     * Tampilkan daftar akun admin.
     */
    public function index(): Response
    {
        $admins = AkunAdmin::orderBy('nama_admin')
            ->get(['id_admin', 'nama_admin', 'username', 'created_at']);

        return Inertia::render('AkunAdmin/Index', [
            'admins' => $admins,
        ]);
    }

    /**
     * Tampilkan form tambah admin baru.
     */
    public function create(): Response
    {
        return Inertia::render('AkunAdmin/Create');
    }

    /**
     * Simpan admin baru.
     */
    public function store(StoreAkunAdminRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        AkunAdmin::create([
            'nama_admin'             => $validated['nama_admin'],
            'username'               => $validated['username'],
            'kata_sandi_terenkripsi' => Hash::make($validated['password']),
        ]);

        return Redirect::route('akun-admin.index')
            ->with('success', 'Akun admin berhasil ditambahkan.');
    }

    /**
     * Tampilkan form edit admin.
     */
    public function edit(AkunAdmin $akun_admin): Response
    {
        return Inertia::render('AkunAdmin/Edit', [
            'admin' => $akun_admin->only('id_admin', 'nama_admin', 'username'),
        ]);
    }

    /**
     * Perbarui data admin.
     */
    public function update(UpdateAkunAdminRequest $request, AkunAdmin $akun_admin): RedirectResponse
    {
        $validated = $request->validated();

        $akun_admin->nama_admin = $validated['nama_admin'];
        $akun_admin->username   = $validated['username'];

        if ($request->filled('password')) {
            $akun_admin->kata_sandi_terenkripsi = Hash::make($validated['password']);
        }

        $akun_admin->save();

        return Redirect::route('akun-admin.index')
            ->with('success', 'Akun admin berhasil diperbarui.');
    }

    /**
     * Hapus akun admin.
     */
    public function destroy(AkunAdmin $akun_admin): RedirectResponse
    {
        // Admin tidak boleh menghapus akunnya sendiri
        if ($akun_admin->id_admin === auth()->id()) {
            return Redirect::route('akun-admin.index')
                ->withErrors(['delete' => 'Anda tidak dapat menghapus akun Anda sendiri.']);
        }

        // Akun admin terakhir tidak boleh dihapus
        if (AkunAdmin::count() <= 1) {
            return Redirect::route('akun-admin.index')
                ->withErrors(['delete' => 'Akun admin terakhir tidak dapat dihapus.']);
        }

        $akun_admin->delete();

        return Redirect::route('akun-admin.index')
            ->with('success', 'Akun admin berhasil dihapus.');
    }
}
