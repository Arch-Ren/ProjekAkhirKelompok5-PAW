<?php

namespace App\Models;

use Database\Factories\AkunAdminFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class AkunAdmin extends Authenticatable
{
    /** @use HasFactory<AkunAdminFactory> */
    use HasFactory, Notifiable;

    protected $table = 'akun_admin';
    protected $primaryKey = 'id_admin';

    /** @var list<string> */
    protected $fillable = [
        'username',
        'kata_sandi_terenkripsi',
        'nama_admin',
    ];

    /** @var list<string> */
    protected $hidden = [
        'kata_sandi_terenkripsi',
        'remember_token',
    ];

    /** Kolom kata sandi yang dipakai oleh Laravel Auth. */
    public function getAuthPasswordName(): string
    {
        return 'kata_sandi_terenkripsi';
    }

    /** Ambil nilai kata sandi terenkripsi untuk proses autentikasi. */
    public function getAuthPassword(): string
    {
        return $this->kata_sandi_terenkripsi;
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'kata_sandi_terenkripsi' => 'hashed',
        ];
    }
}
