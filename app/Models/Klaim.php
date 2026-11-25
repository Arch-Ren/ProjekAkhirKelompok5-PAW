<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Klaim extends Model
{
    public const STATUS_DIAJUKAN = 'Diajukan';

    public const STATUS_DISETUJUI = 'Disetujui';

    public const STATUS_DITOLAK = 'Ditolak';

    public const STATUS_DIKEMBALIKAN = 'Dikembalikan';

    protected $table = 'klaim';

    protected $primaryKey = 'id_klaim';

    /** @var list<string> */
    protected $fillable = [
        'id_barang',
        'kode_klaim',
        'nim_pengklaim',
        'deskripsi_ciri',
        'foto_bukti',
        'tanggal_klaim',
        'status_klaim',
        'alasan_penolakan',
    ];

    /** @return array<string, string> */
    public static function statusOptions(): array
    {
        return [
            'DIAJUKAN' => self::STATUS_DIAJUKAN,
            'DISETUJUI' => self::STATUS_DISETUJUI,
            'DITOLAK' => self::STATUS_DITOLAK,
            'DIKEMBALIKAN' => self::STATUS_DIKEMBALIKAN,
        ];
    }

    /** @return list<string> */
    public static function allStatuses(): array
    {
        return [
            self::STATUS_DIAJUKAN,
            self::STATUS_DISETUJUI,
            self::STATUS_DITOLAK,
            self::STATUS_DIKEMBALIKAN,
        ];
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'tanggal_klaim' => 'date:Y-m-d',
        ];
    }
}
