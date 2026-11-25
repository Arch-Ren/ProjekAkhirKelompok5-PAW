import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({
    klaimMenunggu = 0,
    serahTerimaTerbaru = [],
    links = {},
}) {
    const { auth } = usePage().props;

    const formatTanggal = (dateStr) =>
        new Date(dateStr).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const labelMetode = (metode) =>
        metode === 'qr_form' ? 'QR Form' : 'KTM';

    const menuPengelolaan = [
        {
            judul: 'Kelola Akun Admin',
            deskripsi: 'Tambah, ubah, dan hapus akun petugas admin.',
            href: links.akunAdmin,
        },
        {
            judul: 'Catat Serah Terima',
            deskripsi: 'Input penyerahan barang untuk klaim disetujui.',
            href: links.serahTerimaCreate,
        },
        {
            judul: 'Riwayat Serah Terima',
            deskripsi: 'Lihat daftar dan bukti serah terima barang.',
            href: links.serahTerima,
        },
        {
            judul: 'Verifikasi Klaim',
            deskripsi: 'Tinjau, setujui, atau tolak pengajuan klaim.',
            href: links.klaim,
        },
        {
            judul: 'Barang Temuan',
            deskripsi: 'Kelola daftar barang temuan di pos keamanan.',
            href: links.barangTemuan,
        },
        {
            judul: 'Laporan Kehilangan',
            deskripsi: 'Kelola laporan kehilangan barang dari mahasiswa.',
            href: links.laporanKehilangan,
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Admin
                </h2>
            }
        >
            <Head title="Dashboard Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Sambutan & Ringkasan Klaim Menunggu */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Selamat datang, {auth.user.nama_admin ?? auth.user.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Sistem Pengelolaan Barang Temuan &amp; Kehilangan FILKOM UB (Pos Keamanan Gedung F Lantai 1).
                            </p>
                            {links.profil && (
                                <div className="mt-4">
                                    <Link
                                        href={links.profil}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                    >
                                        Kelola Profil &amp; Ubah Kata Sandi &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-between overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Klaim Menunggu Verifikasi
                                </p>
                                <p className="mt-2 text-3xl font-bold text-amber-600">
                                    {klaimMenunggu}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Klaim berstatus Diajukan yang perlu ditinjau.
                                </p>
                            </div>
                            {links.klaim && (
                                <div className="mt-4">
                                    <Link
                                        href={links.klaim}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                    >
                                        Lihat Daftar Klaim &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Menu Navigasi Halaman Pengelolaan */}
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-base font-semibold text-gray-900">
                            Menu Pengelolaan
                        </h3>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {menuPengelolaan.map((menu) =>
                                menu.href ? (
                                    <Link
                                        key={menu.judul}
                                        href={menu.href}
                                        className="block rounded-lg border border-gray-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40"
                                    >
                                        <p className="font-medium text-gray-900">
                                            {menu.judul}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-600">
                                            {menu.deskripsi}
                                        </p>
                                    </Link>
                                ) : (
                                    <div
                                        key={menu.judul}
                                        className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 opacity-70"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-gray-700">
                                                {menu.judul}
                                            </p>
                                            <span className="rounded bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                                Belum tersedia
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {menu.deskripsi}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* 5 Serah Terima Terbaru */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <h3 className="text-base font-semibold text-gray-900">
                                5 Serah Terima Terbaru
                            </h3>
                            {links.serahTerima && (
                                <Link
                                    href={links.serahTerima}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                >
                                    Lihat Semua &rarr;
                                </Link>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Kode Klaim
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Barang
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Pengambil
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Metode
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Waktu Serah
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {serahTerimaTerbaru.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-8 text-center text-sm text-gray-500"
                                            >
                                                Belum ada data serah terima terbaru.
                                            </td>
                                        </tr>
                                    ) : (
                                        serahTerimaTerbaru.map((item) => (
                                            <tr key={item.id_serah_terima}>
                                                <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-900">
                                                    {item.kode_klaim}
                                                </td>
                                                <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-900">
                                                    {item.deskripsi_singkat}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    <div>{item.nama_pengambil}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {item.nim_pengambil}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                            item.metode_validasi === 'qr_form'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-purple-100 text-purple-800'
                                                        }`}
                                                    >
                                                        {labelMetode(item.metode_validasi)}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {formatTanggal(item.waktu_serah_terima)}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                    {item.show_url ? (
                                                        <Link
                                                            href={item.show_url}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Lihat Bukti
                                                        </Link>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
