<?php

namespace Tests\Feature\Auth;

use App\Models\AkunAdmin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_admin_can_authenticate_using_the_login_screen(): void
    {
        $admin = AkunAdmin::factory()->create();

        $response = $this->post('/login', [
            'username' => $admin->username,
            'password' => 'password',
        ]);

        $this->assertAuthenticatedAs($admin);
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_admin_can_not_authenticate_with_invalid_password(): void
    {
        $admin = AkunAdmin::factory()->create();

        $this->post('/login', [
            'username' => $admin->username,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_authenticated_admin_posting_invalid_login_is_rejected_and_logged_out(): void
    {
        $admin = AkunAdmin::factory()->create();

        $response = $this->actingAs($admin)->post('/login', [
            'username' => $admin->username,
            'password' => 'qwerty',
        ]);

        $response->assertSessionHasErrors('username');
        $this->assertGuest();
    }

    public function test_admin_can_logout(): void
    {
        $admin = AkunAdmin::factory()->create();

        $response = $this->actingAs($admin)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
