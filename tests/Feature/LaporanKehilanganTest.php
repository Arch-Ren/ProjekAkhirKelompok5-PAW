<?php

namespace Tests\Feature;

use App\Models\LaporanKehilangan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LaporanKehilanganTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        // make() tanpa simpan: tabel users sudah diganti akun_admin di fondasi, login belum disesuaikan
        return User::factory()->make();
    }

    private function dataValid(array $ubah = []): array
    {
        return [
            'nama_pelapor' => 'Budi',
            'kontak_pelapor' => '081234567890',
            'deskripsi_barang_hilang' => 'Dompet hitam kulit, ada KTM di dalam',
            'perkiraan_lokasi' => 'Gedung F lantai 2',
            'perkiraan_waktu' => now()->subDay()->toDateTimeString(),
            ...$ubah,
        ];
    }

    public function test_tamu_diarahkan_ke_login(): void
    {
        $this->get('/laporan-kehilangan')->assertRedirect('/login');
    }

    public function test_admin_bisa_menambah_laporan(): void
    {
        $this->actingAs($this->admin())
            ->post('/laporan-kehilangan', $this->dataValid())
            ->assertRedirect(route('laporan-kehilangan.index'));

        $this->assertDatabaseHas('laporan_kehilangan', [
            'nama_pelapor' => 'Budi',
            'tanggal_lapor' => now()->toDateString(),
        ]);
    }

    public function test_laporan_dengan_waktu_masa_depan_ditolak(): void
    {
        $this->actingAs($this->admin())
            ->post('/laporan-kehilangan', $this->dataValid(['perkiraan_waktu' => now()->addDay()->toDateTimeString()]))
            ->assertSessionHasErrors('perkiraan_waktu');

        $this->assertDatabaseCount('laporan_kehilangan', 0);
    }

    public function test_admin_bisa_mengubah_dan_menghapus(): void
    {
        $laporan = LaporanKehilangan::create([...$this->dataValid(), 'tanggal_lapor' => now()->toDateString()]);

        $this->actingAs($this->admin())
            ->patch("/laporan-kehilangan/{$laporan->id_laporan}", $this->dataValid(['perkiraan_lokasi' => 'Kantin']))
            ->assertRedirect(route('laporan-kehilangan.show', $laporan));

        $this->assertSame('Kantin', $laporan->fresh()->perkiraan_lokasi);

        $this->actingAs($this->admin())
            ->delete("/laporan-kehilangan/{$laporan->id_laporan}")
            ->assertRedirect(route('laporan-kehilangan.index'));

        $this->assertDatabaseCount('laporan_kehilangan', 0);
    }
}
