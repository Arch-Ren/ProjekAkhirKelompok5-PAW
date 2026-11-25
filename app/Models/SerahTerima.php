<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SerahTerima extends Model
{
    /**
     * Nama tabel (snake_case tunggal bahasa Indonesia).
     */
    protected $table = 'serah_terima';

    /**
     * Primary key tabel serah_terima.
     */
    protected $primaryKey = 'id_serah_terima';

    // ── Konstanta metode validasi ─────────────────────────────
    public const METODE_QR_FORM = 'qr_form';
    public const METODE_KTM     = 'ktm';

    public const METODE_OPTIONS = [
        self::METODE_QR_FORM,
        self::METODE_KTM,
    ];

    // ── Mass assignment ───────────────────────────────────────
    protected $fillable = [
        'id_klaim',
        'nim_pengambil',
        'metode_validasi',
        'waktu_serah_terima',
    ];

    // ── Casts ─────────────────────────────────────────────────
    protected function casts(): array
    {
        return [
            'waktu_serah_terima' => 'datetime',
        ];
    }

    // ── Relasi ────────────────────────────────────────────────

    /**
     * Klaim yang terkait dengan serah terima ini.
     */
    public function klaim(): BelongsTo
    {
        return $this->belongsTo(Klaim::class, 'id_klaim', 'id_klaim');
    }
}
