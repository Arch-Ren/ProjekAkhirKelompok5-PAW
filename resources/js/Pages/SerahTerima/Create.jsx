import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ klaimDisetujui, metodeOptions }) {
    const { data, setData, post, processing, errors } = useForm({
        id_klaim: '',
        nim_pengambil: '',
        metode_validasi: '',
        waktu_serah_terima: '',
    });

    // Mahasiswa pengklaim dipilih otomatis dari klaim yang dipilih
    const klaimDipilih = klaimDisetujui.find(
        (k) => String(k.id_klaim) === String(data.id_klaim)
    );

    const handleKlaimChange = (e) => {
        const idKlaim = e.target.value;
        const klaim = klaimDisetujui.find(
            (k) => String(k.id_klaim) === String(idKlaim)
        );
        setData((prev) => ({
            ...prev,
            id_klaim: idKlaim,
            nim_pengambil: klaim ? klaim.nim_pengklaim : '',
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('serah-terima.store'));
    };

    const labelMetode = (metode) =>
        metode === 'qr_form' ? 'QR Form (Google Form)' : 'KTM (Kartu Tanda Mahasiswa)';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Catat Serah Terima
                </h2>
            }
        >
            <Head title="Catat Serah Terima" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        {klaimDisetujui.length === 0 ? (
                            <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
                                Tidak ada klaim berstatus <strong>Disetujui</strong> yang belum dicatat serah terimanya.
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-6">
                                {/* Pilih Klaim */}
                                <div>
                                    <InputLabel htmlFor="id_klaim" value="Pilih Klaim" />
                                    <select
                                        id="id_klaim"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                        value={data.id_klaim}
                                        onChange={handleKlaimChange}
                                    >
                                        <option value="">-- Pilih klaim disetujui --</option>
                                        {klaimDisetujui.map((klaim) => (
                                            <option key={klaim.id_klaim} value={klaim.id_klaim}>
                                                [{klaim.kode_klaim}] {klaim.deskripsi_singkat} — {klaim.nama_pengklaim}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.id_klaim} className="mt-2" />
                                </div>

                                {/* Info barang dan pengklaim (otomatis terisi) */}
                                {klaimDipilih && (
                                    <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800 space-y-1">
                                        <p><strong>Barang:</strong> {klaimDipilih.deskripsi_singkat}</p>
                                        <p><strong>Pemilik:</strong> {klaimDipilih.nama_pengklaim} ({klaimDipilih.nim_pengklaim})</p>
                                    </div>
                                )}

                                {/* NIM Pengambil */}
                                <div>
                                    <InputLabel htmlFor="nim_pengambil" value="NIM Pengambil" />
                                    <TextInput
                                        id="nim_pengambil"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.nim_pengambil}
                                        onChange={(e) => setData('nim_pengambil', e.target.value)}
                                        placeholder="Contoh: 215150200111001"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Terisi otomatis dari pengklaim. Ubah jika pengambil berbeda (perwakilan).
                                    </p>
                                    <InputError message={errors.nim_pengambil} className="mt-2" />
                                </div>

                                {/* Metode Validasi */}
                                <div>
                                    <InputLabel htmlFor="metode_validasi" value="Metode Validasi" />
                                    <select
                                        id="metode_validasi"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                        value={data.metode_validasi}
                                        onChange={(e) => setData('metode_validasi', e.target.value)}
                                    >
                                        <option value="">-- Pilih metode --</option>
                                        {metodeOptions.map((m) => (
                                            <option key={m} value={m}>
                                                {labelMetode(m)}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.metode_validasi} className="mt-2" />
                                </div>

                                {/* Waktu Serah Terima */}
                                <div>
                                    <InputLabel htmlFor="waktu_serah_terima" value="Waktu Serah Terima" />
                                    <TextInput
                                        id="waktu_serah_terima"
                                        type="datetime-local"
                                        className="mt-1 block w-full"
                                        value={data.waktu_serah_terima}
                                        onChange={(e) => setData('waktu_serah_terima', e.target.value)}
                                    />
                                    <InputError message={errors.waktu_serah_terima} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('serah-terima.index')}
                                        className="text-sm text-gray-600 underline hover:text-gray-900"
                                    >
                                        Batal
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Simpan & Lihat Bukti
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
