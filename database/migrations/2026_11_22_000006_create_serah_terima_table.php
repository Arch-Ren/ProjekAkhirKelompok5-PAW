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
        Schema::create('serah_terima', function (Blueprint $table) {
            $table->id('id_serah_terima');
            $table->foreignId('id_klaim')
                ->unique()
                ->constrained('klaim', 'id_klaim')
                ->restrictOnDelete()
                ->cascadeOnUpdate();
            $table->string('nim_pengambil', 20);
            $table->string('metode_validasi', 20);
            $table->dateTime('waktu_serah_terima');
            $table->timestamps();

            $table->foreign('nim_pengambil')
                ->references('nim')
                ->on('mahasiswa')
                ->restrictOnDelete()
                ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('serah_terima');
    }
};
