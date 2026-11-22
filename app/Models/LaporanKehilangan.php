<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'nama_pelapor',
    'kontak_pelapor',
    'deskripsi_barang_hilang',
    'perkiraan_lokasi',
    'perkiraan_waktu',
    'tanggal_lapor',
])]
class LaporanKehilangan extends Model
{
    protected $table = 'laporan_kehilangan';

    protected $primaryKey = 'id_laporan';

    protected function casts(): array
    {
        return [
            'perkiraan_waktu' => 'datetime',
            'tanggal_lapor' => 'date',
        ];
    }
}
