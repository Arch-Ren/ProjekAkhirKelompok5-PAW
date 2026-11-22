<?php

namespace App\Http\Requests;

use App\Models\LaporanKehilangan;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

class UpdateLaporanKehilanganRequest extends StoreLaporanKehilanganRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'status' => ['required', Rule::in(LaporanKehilangan::STATUS)],
        ];
    }
}
