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
        Schema::create('penemu', function (Blueprint $table) {
            $table->id('id_penemu');
            $table->string('nim', 20)->nullable();
            $table->string('nama_penemu', 100);
            $table->string('status_penemu', 20);
            $table->timestamps();

            $table->foreign('nim')
                ->references('nim')
                ->on('mahasiswa')
                ->nullOnDelete()
                ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penemu');
    }
};
