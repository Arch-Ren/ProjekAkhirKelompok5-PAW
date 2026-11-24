<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LaporanKehilanganRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_pelapor' => ['required', 'string', 'max:100'],
            'kontak_pelapor' => ['required', 'string', 'max:100'],
            'deskripsi_barang_hilang' => ['required', 'string'],
            'perkiraan_lokasi' => ['required', 'string', 'max:150'],
            'perkiraan_waktu' => ['required', 'date', 'before_or_equal:now'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'max' => ':attribute maksimal :max karakter.',
            'date' => ':attribute harus berupa tanggal yang valid.',
            'perkiraan_waktu.before_or_equal' => 'Perkiraan waktu hilang tidak boleh di masa depan.',
        ];
    }

    public function attributes(): array
    {
        return [
            'nama_pelapor' => 'Nama pelapor',
            'kontak_pelapor' => 'Kontak pelapor',
            'deskripsi_barang_hilang' => 'Deskripsi barang hilang',
            'perkiraan_lokasi' => 'Perkiraan lokasi',
            'perkiraan_waktu' => 'Perkiraan waktu hilang',
        ];
    }
}
