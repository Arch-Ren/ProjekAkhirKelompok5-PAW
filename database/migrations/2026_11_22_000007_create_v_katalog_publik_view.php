<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            CREATE OR REPLACE VIEW v_katalog_publik AS
            SELECT
                id_barang,
                foto_barang,
                deskripsi_singkat,
                lokasi_ditemukan,
                waktu_ditemukan
            FROM barang_temuan
            WHERE status_barang = 'Tersimpan'
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS v_katalog_publik');
    }
};
