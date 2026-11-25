<?php

namespace Database\Seeders;

use App\Models\AkunAdmin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AkunAdminSeeder extends Seeder
{
    /** Seed akun satpam (admin) awal untuk login pertama kali. */
    public function run(): void
    {
        AkunAdmin::firstOrCreate(
            ['username' => 'satpam1'],
            [
                'nama_admin' => 'Satpam Pos Gedung F',
                'kata_sandi_terenkripsi' => Hash::make('password123'),
            ],
        );
    }
}
