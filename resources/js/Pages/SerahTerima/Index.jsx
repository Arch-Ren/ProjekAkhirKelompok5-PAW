import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ serahTerima }) {
    const { flash } = usePage().props;

    const formatTanggal = (dateStr) =>
        new Date(dateStr).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const labelMetode = (metode) =>
        metode === 'qr_form' ? 'QR Form' : 'KTM';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Riwayat Serah Terima
                    </h2>
                    <Link href={route('serah-terima.create')}>
                        <button className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Catat Serah Terima
                        </button>
                    </Link>
                </div>
            }
        >
            <Head title="Riwayat Serah Terima" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kode Klaim</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Barang</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Pengambil</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Metode</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Waktu Serah</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {serahTerima.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                                                Belum ada catatan serah terima.
                                            </td>
                                        </tr>
                                    ) : (
                                        serahTerima.data.map((item, index) => (
                                            <tr key={item.id_serah_terima}>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {(serahTerima.current_page - 1) * serahTerima.per_page + index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-900">
                                                    {item.kode_klaim}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                                    {item.deskripsi_singkat}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    <div>{item.nama_pengambil}</div>
                                                    <div className="text-xs text-gray-500">{item.nim_pengambil}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        item.metode_validasi === 'qr_form'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-purple-100 text-purple-800'
                                                    }`}>
                                                        {labelMetode(item.metode_validasi)}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {formatTanggal(item.waktu_serah_terima)}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                    <Link
                                                        href={route('serah-terima.show', item.id_serah_terima)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Lihat Bukti
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {serahTerima.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
                                <p className="text-sm text-gray-700">
                                    Menampilkan{' '}
                                    <span className="font-medium">{serahTerima.from}</span>–
                                    <span className="font-medium">{serahTerima.to}</span>{' '}
                                    dari <span className="font-medium">{serahTerima.total}</span> catatan
                                </p>
                                <div className="flex gap-2">
                                    {serahTerima.links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`rounded px-3 py-1 text-sm ${
                                                    link.active
                                                        ? 'bg-gray-800 text-white'
                                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="rounded border border-gray-200 px-3 py-1 text-sm text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
