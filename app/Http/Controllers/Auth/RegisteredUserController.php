<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterAdminRequest;
use App\Models\AkunAdmin;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Tampilkan halaman pendaftaran akun admin baru (khusus admin yang sudah login).
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /** Simpan akun admin baru tanpa menimpa sesi admin yang sedang login. */
    public function store(RegisterAdminRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $admin = AkunAdmin::create([
            'nama_admin' => $validated['nama_admin'],
            'username' => $validated['username'],
            'kata_sandi_terenkripsi' => Hash::make($validated['password']),
        ]);

        event(new Registered($admin));

        return redirect(route('register', absolute: false))
            ->with('success', 'Akun admin berhasil didaftarkan.');
    }
}
