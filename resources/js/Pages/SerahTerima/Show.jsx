import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ serahTerima }) {
    const formatTanggal = (dateStr) =>
        new Date(dateStr).toLocaleString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const labelMetode = (metode) =>
        metode === 'qr_form' ? 'QR Form (Google Form)' : 'KTM (Kartu Tanda Mahasiswa)';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Bukti Serah Terima
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href={route('serah-terima.index')}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                        >
                            ← Kembali
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
                        >
                            Cetak
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Bukti Serah Terima — ${serahTerima.kode_klaim}`} />

            <div className="py-12 print:py-4">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg print:shadow-none">
                        {/* Header Bukti */}
                        <div className="border-b border-gray-200 p-6 text-center print:border-b-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                                BUKTI SERAH TERIMA BARANG
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Pos Keamanan FILKOM — Gedung F Lantai 1
                            </p>
                            <p className="mt-1 font-mono text-lg font-semibold text-indigo-700">
                                No. {serahTerima.id_serah_terima.toString().padStart(5, '0')}
                            </p>
                        </div>

                        {/* Detail */}
                        <div className="p-6 space-y-6">
                            {/* Info Barang */}
                            <div>
                                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Data Barang
                                </h3>
                                <dl className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm">
                                    <dt className="font-medium text-gray-500">Kode Klaim</dt>
                                    <dd className="col-span-2 font-mono font-semibold text-gray-900">
                                        {serahTerima.kode_klaim}
                                    </dd>

                                    <dt className="font-medium text-gray-500">Deskripsi Barang</dt>
                                    <dd className="col-span-2 text-gray-900">
                                        {serahTerima.deskripsi_singkat}
                                    </dd>

                                    <dt className="font-medium text-gray-500">Lokasi Ditemukan</dt>
                                    <dd className="col-span-2 text-gray-900">
                                        {serahTerima.lokasi_ditemukan}
                                    </dd>
                                </dl>
                            </div>

                            <hr />

                            {/* Info Pengambil */}
                            <div>
                                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Data Pengambil
                                </h3>
                                <dl className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm">
                                    <dt className="font-medium text-gray-500">Nama</dt>
                                    <dd className="col-span-2 text-gray-900">
                                        {serahTerima.nama_pengambil}
                                    </dd>

                                    <dt className="font-medium text-gray-500">NIM</dt>
                                    <dd className="col-span-2 font-mono text-gray-900">
                                        {serahTerima.nim_pengambil}
                                    </dd>

                                    <dt className="font-medium text-gray-500">Email</dt>
                                    <dd className="col-span-2 text-gray-900">
                                        {serahTerima.email_pengambil}
                                    </dd>
                                </dl>
                            </div>

                            <hr />

                            {/* Info Serah Terima */}
                            <div>
                                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Detail Penyerahan
                                </h3>
                                <dl className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm">
                                    <dt className="font-medium text-gray-500">Waktu Serah Terima</dt>
                                    <dd className="col-span-2 text-gray-900">
                                        {formatTanggal(serahTerima.waktu_serah_terima)}
                                    </dd>

                                    <dt className="font-medium text-gray-500">Metode Validasi</dt>
                                    <dd className="col-span-2 text-gray-900">
                                        {labelMetode(serahTerima.metode_validasi)}
                                    </dd>

                                    <dt className="font-medium text-gray-500">Dicatat Pada</dt>
                                    <dd className="col-span-2 text-gray-500">
                                        {formatTanggal(serahTerima.created_at)}
                                    </dd>
                                </dl>
                            </div>

                            {/* Tanda Tangan */}
                            <div className="mt-8 grid grid-cols-2 gap-8 text-center text-sm print:mt-12">
                                <div>
                                    <p className="text-gray-600">Petugas Keamanan</p>
                                    <div className="mt-16 border-t border-gray-400 pt-1">
                                        <p className="text-gray-900">( _____________________ )</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-600">Penerima Barang</p>
                                    <div className="mt-16 border-t border-gray-400 pt-1">
                                        <p className="text-gray-900">( {serahTerima.nama_pengambil} )</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
