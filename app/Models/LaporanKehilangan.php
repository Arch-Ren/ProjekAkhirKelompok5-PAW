<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'nama_pelapor',
    'kontak_pelapor',
    'nama_barang',
    'kategori',
    'ciri_ciri',
    'lokasi_terakhir',
    'waktu_hilang',
    'status',
])]
class LaporanKehilangan extends Model
{
    public const STATUS_AKTIF = 'aktif';
    public const STATUS_DITEMUKAN = 'ditemukan';
    public const STATUS_DITUTUP = 'ditutup';

    public const STATUS = [
        self::STATUS_AKTIF,
        self::STATUS_DITEMUKAN,
        self::STATUS_DITUTUP,
    ];

    protected $table = 'laporan_kehilangan';

    protected function casts(): array
    {
        return [
            'waktu_hilang' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
