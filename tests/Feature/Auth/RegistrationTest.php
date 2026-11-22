<?php

namespace Tests\Feature\Auth;

use App\Models\AkunAdmin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_access_registration_screen(): void
    {
        $response = $this->get('/register');

        $response->assertRedirect(route('login', absolute: false));
    }

    public function test_authenticated_admin_can_render_registration_screen(): void
    {
        $admin = AkunAdmin::factory()->create();

        $response = $this->actingAs($admin)->get('/register');

        $response->assertStatus(200);
    }

    public function test_authenticated_admin_can_register_new_admin_without_switching_session(): void
    {
        $admin = AkunAdmin::factory()->create();

        $response = $this->actingAs($admin)->post('/register', [
            'nama_admin' => 'Satpam Pos 2',
            'username' => 'satpam2',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $this->assertAuthenticatedAs($admin);
        $this->assertDatabaseHas('akun_admin', [
            'nama_admin' => 'Satpam Pos 2',
            'username' => 'satpam2',
        ]);
        $response->assertRedirect(route('register', absolute: false));
        $response->assertSessionHas('success');
    }
}
