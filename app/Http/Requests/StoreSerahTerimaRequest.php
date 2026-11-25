<?php

namespace App\Http\Requests;

use App\Models\Klaim;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class StoreSerahTerimaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_klaim' => [
                'required',
                'integer',
                Rule::exists('klaim', 'id_klaim'),
                Rule::unique('serah_terima', 'id_klaim'),
                function ($attribute, $value, $fail) {
                    $klaim = DB::table('klaim')
                        ->where('id_klaim', $value)
                        ->first();

                    if (!$klaim || $klaim->status_klaim !== Klaim::STATUS_DISETUJUI) {
                        $fail('Klaim yang dipilih belum berstatus disetujui.');
                    }
                },
            ],
            'nim_pengambil'      => ['required', 'string', Rule::exists('mahasiswa', 'nim')],
            'metode_validasi'    => ['required', 'string', Rule::in(['qr_form', 'ktm'])],
            'waktu_serah_terima' => ['required', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'id_klaim.required'           => 'Klaim wajib dipilih.',
            'id_klaim.exists'             => 'Klaim tidak ditemukan.',
            'id_klaim.unique'             => 'Klaim ini sudah memiliki catatan serah terima.',
            'nim_pengambil.required'      => 'NIM pengambil wajib diisi.',
            'nim_pengambil.exists'        => 'NIM pengambil tidak terdaftar di data mahasiswa.',
            'metode_validasi.required'    => 'Metode validasi wajib dipilih.',
            'metode_validasi.in'          => 'Metode validasi harus berupa QR Form atau KTM.',
            'waktu_serah_terima.required' => 'Waktu serah terima wajib diisi.',
            'waktu_serah_terima.date'     => 'Format waktu serah terima tidak valid.',
        ];
    }
}
