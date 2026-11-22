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
            $table->id();
            $table->foreignId('klaim_id')->unique()->constrained('klaim')->cascadeOnDelete();
            $table->foreignId('barang_temuan_id')->constrained('barang_temuan')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('nama_pengambil');
            $table->string('nim_pengambil');
            $table->string('metode'); // qr_form, ktm
            $table->dateTime('waktu_serah');
            $table->text('catatan')->nullable();
            $table->timestamps();
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
