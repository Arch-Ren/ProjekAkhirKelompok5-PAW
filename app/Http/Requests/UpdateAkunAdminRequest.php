<?php

namespace App\Http\Requests;

use App\Models\AkunAdmin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class UpdateAkunAdminRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'nama_admin' => ['required', 'string', 'max:100'],
            'username'   => [
                'required',
                'string',
                'max:50',
                'alpha_dash',
                Rule::unique(AkunAdmin::class, 'username')->ignore($this->route('akun_admin')),
            ],
            'password'   => ['nullable', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_admin.required' => 'Nama admin wajib diisi.',
            'nama_admin.max'      => 'Nama admin maksimal 100 karakter.',
            'username.required'   => 'Username wajib diisi.',
            'username.max'        => 'Username maksimal 50 karakter.',
            'username.alpha_dash' => 'Username hanya boleh berisi huruf, angka, tanda hubung, dan garis bawah.',
            'username.unique'     => 'Username sudah terdaftar.',
            'password.confirmed'  => 'Konfirmasi kata sandi tidak cocok.',
        ];
    }
}
