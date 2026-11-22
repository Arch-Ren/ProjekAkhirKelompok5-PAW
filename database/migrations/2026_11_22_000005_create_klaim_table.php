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
        Schema::create('klaim', function (Blueprint $table) {
            $table->id('id_klaim');
            $table->foreignId('id_barang')
                ->constrained('barang_temuan', 'id_barang')
                ->restrictOnDelete()
                ->cascadeOnUpdate();
            $table->string('kode_klaim', 20)->unique();
            $table->string('nim_pengklaim', 20);
            $table->text('deskripsi_ciri');
            $table->string('foto_bukti');
            $table->date('tanggal_klaim');
            $table->string('status_klaim', 20)->default('Diajukan');
            $table->text('alasan_penolakan')->nullable();
            $table->timestamps();

            $table->foreign('nim_pengklaim')
                ->references('nim')
                ->on('mahasiswa')
                ->restrictOnDelete()
                ->cascadeOnUpdate();
            $table->index('id_barang', 'idx_klaim_barang');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('klaim');
    }
};
