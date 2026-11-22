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

    // ── Konstanta metode ──────────────────────────────────────
    public const METODE_QR_FORM = 'qr_form';
    public const METODE_KTM    = 'ktm';

    public const METODE_OPTIONS = [
        self::METODE_QR_FORM,
        self::METODE_KTM,
    ];

    // ── Mass assignment ───────────────────────────────────────
    protected $fillable = [
        'klaim_id',
        'barang_temuan_id',
        'user_id',
        'nama_pengambil',
        'nim_pengambil',
        'metode',
        'waktu_serah',
        'catatan',
    ];

    // ── Casts ─────────────────────────────────────────────────
    protected function casts(): array
    {
        return [
            'waktu_serah' => 'datetime',
        ];
    }

    // ── Relasi ────────────────────────────────────────────────

    /**
     * Klaim yang terkait dengan serah terima ini.
     */
    public function klaim(): BelongsTo
    {
        return $this->belongsTo(Klaim::class);
    }

    /**
     * Barang temuan yang diserahkan.
     */
    public function barangTemuan(): BelongsTo
    {
        return $this->belongsTo(BarangTemuan::class);
    }

    /**
     * Petugas (admin/satpam) yang mencatat serah terima.
     */
    public function petugas(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
