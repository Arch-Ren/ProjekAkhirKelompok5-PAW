<?php

namespace Tests\Feature;

use App\Models\LaporanKehilangan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LaporanKehilanganTest extends TestCase
{
    use RefreshDatabase;

    private function dataValid(array $ubah = []): array
    {
        return [
            'nama_pelapor' => 'Budi',
            'kontak_pelapor' => '081234567890',
            'nama_barang' => 'Dompet hitam',
            'kategori' => 'Dompet dan Tas',
            'ciri_ciri' => 'Kulit, ada KTM di dalam',
            'lokasi_terakhir' => 'Gedung F lantai 2',
            'waktu_hilang' => now()->subDay()->toDateTimeString(),
            ...$ubah,
        ];
    }

    public function test_tamu_diarahkan_ke_login(): void
    {
        $this->get('/laporan-kehilangan')->assertRedirect('/login');
    }

    public function test_admin_bisa_menambah_laporan(): void
    {
        $admin = User::factory()->create();

        $this->actingAs($admin)
            ->post('/laporan-kehilangan', $this->dataValid())
            ->assertRedirect(route('laporan-kehilangan.index'));

        $this->assertDatabaseHas('laporan_kehilangan', [
            'nama_barang' => 'Dompet hitam',
            'user_id' => $admin->id,
            'status' => LaporanKehilangan::STATUS_AKTIF,
        ]);
    }

    public function test_laporan_dengan_kategori_salah_ditolak(): void
    {
        $this->actingAs(User::factory()->create())
            ->post('/laporan-kehilangan', $this->dataValid(['kategori' => 'Mobil']))
            ->assertSessionHasErrors('kategori');

        $this->assertDatabaseCount('laporan_kehilangan', 0);
    }

    public function test_admin_bisa_mengubah_status_dan_menghapus(): void
    {
        $admin = User::factory()->create();
        $laporan = LaporanKehilangan::create([...$this->dataValid(), 'user_id' => $admin->id]);

        $this->actingAs($admin)
            ->patch("/laporan-kehilangan/{$laporan->id}", $this->dataValid(['status' => LaporanKehilangan::STATUS_DITEMUKAN]))
            ->assertRedirect(route('laporan-kehilangan.show', $laporan));

        $this->assertSame(LaporanKehilangan::STATUS_DITEMUKAN, $laporan->fresh()->status);

        $this->actingAs($admin)
            ->delete("/laporan-kehilangan/{$laporan->id}")
            ->assertRedirect(route('laporan-kehilangan.index'));

        $this->assertDatabaseCount('laporan_kehilangan', 0);
    }
}
