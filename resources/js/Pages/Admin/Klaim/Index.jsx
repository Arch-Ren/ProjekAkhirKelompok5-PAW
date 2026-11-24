import { Fragment, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import MainLayout from '@/Layouts/MainLayout';

function formatTanggal(value) {
    if (!value) {
        return '-';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(parsed);
}

function resolveFotoUrl(path) {
    if (!path) {
        return null;
    }

    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
        return path;
    }

    return `/storage/${path}`;
}

function formatPaginationLabel(label) {
    if (label.includes('Previous')) {
        return 'Sebelumnya';
    }

    if (label.includes('Next')) {
        return 'Berikutnya';
    }

    return label;
}

export default function Index({
    klaim = { data: [], links: [], total: 0, from: 0, to: 0, last_page: 1 },
    filters = { status: null },
    statusKlaim = {},
}) {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const items = Array.isArray(klaim) ? klaim : (klaim?.data ?? []);
    const links = Array.isArray(klaim?.links) ? klaim.links : [];
    const total = klaim?.total ?? items.length;
    const activeStatus = filters?.status ?? null;
    const statusList = Object.values(statusKlaim);

    const statusBadgeMap = {
        [statusKlaim.DIAJUKAN]:
            'border-[#f9e2af]/30 bg-[#f9e2af]/10 text-[#f9e2af]',
        [statusKlaim.DISETUJUI]:
            'border-[#a6e3a1]/30 bg-[#a6e3a1]/10 text-[#a6e3a1]',
        [statusKlaim.DITOLAK]:
            'border-[#f38ba8]/30 bg-[#f38ba8]/10 text-[#f38ba8]',
        [statusKlaim.DIKEMBALIKAN]:
            'border-[#cba6f7]/30 bg-[#cba6f7]/10 text-[#cba6f7]',
    };

    const handleFilterStatus = (status) => {
        router.get('/admin/klaim', status ? { status } : {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <MainLayout title="Daftar Klaim">
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
                {/* Baris Atas: Judul di kiri, tombol + Baru di kanan */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#cdd6f4]">
                            Daftar Klaim
                        </h1>
                        <p className="mt-1 text-sm text-[#a6adc8]">
                            Data pengajuan klaim barang temuan yang tercatat di database.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center justify-center gap-1.5 self-start rounded-lg bg-[#cba6f7] px-4 py-2.5 text-sm font-semibold text-[#11111b] shadow-sm transition hover:bg-[#b4befe] focus:outline-none focus:ring-2 focus:ring-[#cba6f7]/60 focus:ring-offset-2 focus:ring-offset-[#1e1e2e] sm:self-auto"
                    >
                        <span aria-hidden="true" className="text-base leading-none">
                            +
                        </span>
                        <span>Baru</span>
                    </button>
                </div>

                {/* Filter Status di atas tabel */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleFilterStatus(null)}
                            className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition ${
                                activeStatus === null
                                    ? 'border-[#cba6f7]/50 bg-[#313244] text-[#cba6f7]'
                                    : 'border-[#313244] bg-[#181825] text-[#a6adc8] hover:border-[#45475a] hover:text-[#cdd6f4]'
                            }`}
                        >
                            Semua
                        </button>

                        {statusList.map((status) => {
                            const isActive = activeStatus === status;
                            return (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => handleFilterStatus(status)}
                                    className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition ${
                                        isActive
                                            ? 'border-[#cba6f7]/50 bg-[#313244] text-[#cba6f7]'
                                            : 'border-[#313244] bg-[#181825] text-[#a6adc8] hover:border-[#45475a] hover:text-[#cdd6f4]'
                                    }`}
                                >
                                    {status}
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-xs text-[#a6adc8]">
                        Total: <span className="font-semibold text-[#cdd6f4]">{total}</span> klaim
                    </p>
                </div>

                {/* Tabel Data Klaim */}
                <div className="overflow-hidden rounded-2xl border border-[#313244] bg-[#181825] shadow-xl shadow-[#11111b]/40">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#313244] text-left text-sm">
                            <thead className="bg-[#11111b]/60 text-xs font-semibold uppercase tracking-wider text-[#a6adc8]">
                                <tr>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3.5">
                                        Kode Klaim
                                    </th>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3.5">
                                        Barang Temuan
                                    </th>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3.5">
                                        NIM Pengklaim
                                    </th>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3.5">
                                        Nama Pengklaim
                                    </th>
                                    <th scope="col" className="px-4 py-3.5">
                                        Deskripsi Ciri
                                    </th>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3.5">
                                        Foto Bukti
                                    </th>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3.5">
                                        Tanggal Klaim
                                    </th>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3.5">
                                        Status
                                    </th>
                                    <th scope="col" className="px-4 py-3.5">
                                        Alasan Penolakan
                                    </th>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#313244]/80 text-[#cdd6f4]">
                                {items.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="px-6 py-14 text-center text-sm text-[#a6adc8]"
                                        >
                                            <p className="font-medium text-[#cdd6f4]">
                                                {activeStatus
                                                    ? `Belum ada data klaim dengan status "${activeStatus}".`
                                                    : 'Belum ada data klaim di database.'}
                                            </p>
                                            <p className="mt-1 text-xs text-[#a6adc8]">
                                                {activeStatus
                                                    ? 'Coba ganti filter status untuk melihat data lainnya.'
                                                    : 'Data klaim yang masuk akan ditampilkan di tabel ini.'}
                                            </p>
                                            {activeStatus && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleFilterStatus(null)}
                                                    className="mt-4 rounded-lg border border-[#45475a] px-3.5 py-1.5 text-xs font-medium text-[#cdd6f4] transition hover:bg-[#313244]"
                                                >
                                                    Tampilkan Semua
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => {
                                        const fotoUrl = resolveFotoUrl(item.foto_bukti);
                                        const badgeClass =
                                            statusBadgeMap[item.status_klaim] ??
                                            'border-[#45475a] bg-[#313244] text-[#cdd6f4]';

                                        return (
                                            <tr
                                                key={item.id_klaim}
                                                className="transition hover:bg-[#313244]/35"
                                            >
                                                <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs font-semibold text-[#b4befe]">
                                                    {item.kode_klaim || '-'}
                                                </td>
                                                <td className="max-w-[200px] px-4 py-3.5 text-[#a6adc8]">
                                                    {item.barang_temuan?.deskripsi_singkat ?? '-'}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-[#cdd6f4]">
                                                    {item.nim_pengklaim || '-'}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5 text-[#a6adc8]">
                                                    {item.mahasiswa?.nama ?? '-'}
                                                </td>
                                                <td
                                                    className="max-w-xs px-4 py-3.5 text-[#cdd6f4]"
                                                    title={item.deskripsi_ciri || ''}
                                                >
                                                    <p className="line-clamp-2">
                                                        {item.deskripsi_ciri || '-'}
                                                    </p>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5">
                                                    {fotoUrl ? (
                                                        <a
                                                            href={fotoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center rounded-md border border-[#45475a] bg-[#313244]/60 px-2.5 py-1 text-xs font-medium text-[#89b4fa] transition hover:border-[#89b4fa]/50 hover:bg-[#313244]"
                                                        >
                                                            Lihat Foto
                                                        </a>
                                                    ) : (
                                                        <span className="text-[#a6adc8]">-</span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5 text-xs text-[#a6adc8]">
                                                    {formatTanggal(item.tanggal_klaim)}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5">
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
                                                    >
                                                        {item.status_klaim || '-'}
                                                    </span>
                                                </td>
                                                <td
                                                    className="max-w-[200px] px-4 py-3.5 text-xs text-[#a6adc8]"
                                                    title={item.alasan_penolakan || ''}
                                                >
                                                    <p className="line-clamp-2">
                                                        {item.alasan_penolakan || '-'}
                                                    </p>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5 text-center text-[#a6adc8]">
                                                    -
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Paginasi */}
                    {klaim?.last_page > 1 && links.length > 0 && (
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#313244] bg-[#11111b]/40 px-4 py-3 sm:flex-row">
                            <p className="text-xs text-[#a6adc8]">
                                Menampilkan{' '}
                                <span className="font-medium text-[#cdd6f4]">
                                    {klaim.from ?? 0}
                                </span>{' '}
                                sampai{' '}
                                <span className="font-medium text-[#cdd6f4]">
                                    {klaim.to ?? 0}
                                </span>{' '}
                                dari{' '}
                                <span className="font-medium text-[#cdd6f4]">
                                    {total}
                                </span>{' '}
                                data
                            </p>

                            <nav className="flex flex-wrap items-center gap-1" aria-label="Paginasi">
                                {links.map((link, idx) => {
                                    const label = formatPaginationLabel(link.label);

                                    if (!link.url) {
                                        return (
                                            <span
                                                key={`${label}-${idx}`}
                                                className="cursor-not-allowed rounded-lg border border-[#313244] px-3 py-1.5 text-xs text-[#6c7086]"
                                            >
                                                {label}
                                            </span>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={`${label}-${idx}`}
                                            href={link.url}
                                            preserveScroll
                                            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                                                link.active
                                                    ? 'border-[#cba6f7] bg-[#cba6f7] text-[#11111b]'
                                                    : 'border-[#313244] bg-[#181825] text-[#cdd6f4] hover:border-[#45475a] hover:bg-[#313244]'
                                            }`}
                                        >
                                            {label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Placeholder Gelap untuk Tombol + Baru */}
            <Transition show={showCreateModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setShowCreateModal(false)}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[#11111b]/75 backdrop-blur-sm" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto p-4">
                        <div className="flex min-h-full items-center justify-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 translate-y-3 scale-95"
                                enterTo="opacity-100 translate-y-0 scale-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0 scale-100"
                                leaveTo="opacity-0 translate-y-3 scale-95"
                            >
                                <DialogPanel className="w-full max-w-lg rounded-2xl border border-[#313244] bg-[#181825] p-6 text-[#cdd6f4] shadow-2xl shadow-[#11111b]/70">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <DialogTitle className="text-lg font-semibold text-[#cdd6f4]">
                                                Tambah Klaim Baru
                                            </DialogTitle>
                                            <p className="mt-1 text-xs text-[#a6adc8]">
                                                Modal pengisian data klaim barang temuan.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setShowCreateModal(false)}
                                            className="rounded-lg p-1.5 text-[#a6adc8] transition hover:bg-[#313244] hover:text-[#cdd6f4]"
                                            aria-label="Tutup modal"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mt-5 rounded-xl border border-dashed border-[#45475a] bg-[#1e1e2e]/70 px-5 py-8 text-center">
                                        <p className="text-sm font-medium text-[#cdd6f4]">
                                            Form pengisian klaim akan ditempatkan di sini.
                                        </p>
                                        <p className="mt-1.5 text-xs leading-relaxed text-[#a6adc8]">
                                            Menunggu kesiapan modul relasi barang temuan dan data mahasiswa
                                            sebelum field input pengajuan klaim diaktifkan.
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateModal(false)}
                                            className="rounded-lg border border-[#45475a] px-4 py-2 text-sm font-medium text-[#cdd6f4] transition hover:bg-[#313244]"
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </MainLayout>
    );
}
