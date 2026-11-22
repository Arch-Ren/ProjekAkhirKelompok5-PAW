<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLaporanKehilanganRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_pelapor' => ['required', 'string', 'max:100'],
            'kontak_pelapor' => ['required', 'string', 'max:50'],
            'nama_barang' => ['required', 'string', 'max:100'],
            'kategori' => ['required', Rule::in(config('lostfound.kategori'))],
            'ciri_ciri' => ['required', 'string'],
            'lokasi_terakhir' => ['required', 'string', 'max:255'],
            'waktu_hilang' => ['required', 'date', 'before_or_equal:now'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'max' => ':attribute maksimal :max karakter.',
            'in' => ':attribute tidak valid.',
            'date' => ':attribute harus berupa tanggal yang valid.',
            'waktu_hilang.before_or_equal' => 'Waktu hilang tidak boleh di masa depan.',
        ];
    }

    public function attributes(): array
    {
        return [
            'nama_pelapor' => 'Nama pelapor',
            'kontak_pelapor' => 'Kontak pelapor',
            'nama_barang' => 'Nama barang',
            'kategori' => 'Kategori',
            'ciri_ciri' => 'Ciri-ciri',
            'lokasi_terakhir' => 'Lokasi terakhir',
            'waktu_hilang' => 'Waktu hilang',
            'status' => 'Status',
        ];
    }
}
