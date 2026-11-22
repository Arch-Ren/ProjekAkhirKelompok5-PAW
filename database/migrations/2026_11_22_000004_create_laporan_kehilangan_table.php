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
        Schema::create('laporan_kehilangan', function (Blueprint $table) {
            $table->id('id_laporan');
            $table->string('nama_pelapor', 100);
            $table->string('kontak_pelapor', 100);
            $table->text('deskripsi_barang_hilang');
            $table->string('perkiraan_lokasi', 150);
            $table->dateTime('perkiraan_waktu');
            $table->date('tanggal_lapor');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_kehilangan');
    }
};
