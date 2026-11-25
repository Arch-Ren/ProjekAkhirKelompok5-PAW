<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Klaim;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class KlaimController extends Controller
{
    /**
     * Menampilkan daftar klaim dari database untuk admin (satpam).
     * Mengembalikan JSON jika diminta oleh klien API/Postman (Accept: application/json).
     */
    public function index(Request $request): JsonResponse|InertiaResponse
    {
        $statusFilter = $request->query('status');
        $validStatus = is_string($statusFilter) && in_array($statusFilter, Klaim::allStatuses(), true)
            ? $statusFilter
            : null;

        $query = Klaim::query()
            ->orderByRaw('CASE WHEN status_klaim = ? THEN 0 ELSE 1 END', [Klaim::STATUS_DIAJUKAN])
            ->orderByDesc('tanggal_klaim')
            ->orderByDesc('id_klaim');

        if ($validStatus !== null) {
            $query->where('status_klaim', $validStatus);
        }

        $klaim = $query->paginate(10)->withQueryString();

        $payload = [
            'klaim' => $klaim,
            'filters' => [
                'status' => $validStatus,
            ],
            'statusKlaim' => Klaim::statusOptions(),
        ];

        if ($request->wantsJson() && ! $request->header('X-Inertia')) {
            return response()->json($payload);
        }

        return Inertia::render('Admin/Klaim/Index', $payload);
    }
}
