<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAkunAdminRequest;
use App\Http\Requests\UpdateAkunAdminRequest;
use App\Models\User;
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
        $admins = User::orderBy('name')
            ->get(['id', 'name', 'email', 'created_at']);

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
        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return Redirect::route('akun-admin.index')
            ->with('success', 'Akun admin berhasil ditambahkan.');
    }

    /**
     * Tampilkan form edit admin.
     */
    public function edit(User $akun_admin): Response
    {
        return Inertia::render('AkunAdmin/Edit', [
            'admin' => $akun_admin->only('id', 'name', 'email'),
        ]);
    }

    /**
     * Perbarui data admin.
     */
    public function update(UpdateAkunAdminRequest $request, User $akun_admin): RedirectResponse
    {
        $akun_admin->name  = $request->name;
        $akun_admin->email = $request->email;

        if ($request->filled('password')) {
            $akun_admin->password = Hash::make($request->password);
        }

        $akun_admin->save();

        return Redirect::route('akun-admin.index')
            ->with('success', 'Akun admin berhasil diperbarui.');
    }

    /**
     * Hapus akun admin.
     */
    public function destroy(User $akun_admin): RedirectResponse
    {
        // Admin tidak boleh menghapus akunnya sendiri
        if ($akun_admin->id === auth()->id()) {
            return Redirect::route('akun-admin.index')
                ->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        // Akun admin terakhir tidak boleh dihapus
        if (User::count() <= 1) {
            return Redirect::route('akun-admin.index')
                ->with('error', 'Akun admin terakhir tidak dapat dihapus.');
        }

        $akun_admin->delete();

        return Redirect::route('akun-admin.index')
            ->with('success', 'Akun admin berhasil dihapus.');
    }
}
