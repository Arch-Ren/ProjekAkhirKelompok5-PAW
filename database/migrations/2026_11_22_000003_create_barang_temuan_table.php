<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('barang_temuan', function (Blueprint $table) {
            $table->id('id_barang');
            $table->foreignId('id_penemu')
                ->constrained('penemu', 'id_penemu')
                ->restrictOnDelete()
                ->cascadeOnUpdate();
            $table->string('foto_barang');
            $table->text('deskripsi_singkat');
            $table->text('ciri_khusus')->nullable();
            $table->string('lokasi_ditemukan', 150);
            $table->dateTime('waktu_ditemukan');
            $table->string('status_barang', 20)->default('Tersimpan');
            $table->string('tindak_lanjut')->nullable();
            $table->date('tanggal_tindak_lanjut')->nullable();
            $table->timestamps();

            $table->index('status_barang', 'idx_barang_status');
            $table->index('waktu_ditemukan', 'idx_barang_waktu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang_temuan');
    }
};
