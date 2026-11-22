<?php

namespace Database\Factories;

use App\Models\AkunAdmin;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/** @extends Factory<AkunAdmin> */
class AkunAdminFactory extends Factory
{
    protected $model = AkunAdmin::class;

    protected static ?string $password;

    /** @return array<string, mixed> */
    public function definition(): array
    {
        return [
            'username' => fake()->unique()->userName(),
            'kata_sandi_terenkripsi' => static::$password ??= Hash::make('password'),
            'nama_admin' => fake()->name(),
            'remember_token' => Str::random(10),
        ];
    }
}
