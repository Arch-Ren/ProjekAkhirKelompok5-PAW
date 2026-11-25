import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ admin }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_admin: admin.nama_admin,
        username: admin.username,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('akun-admin.update', admin.id_admin));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Admin: {admin.nama_admin}
                </h2>
            }
        >
            <Head title={`Edit Admin: ${admin.nama_admin}`} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="nama_admin" value="Nama Admin" />
                                <TextInput
                                    id="nama_admin"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.nama_admin}
                                    onChange={(e) => setData('nama_admin', e.target.value)}
                                    isFocused={true}
                                />
                                <InputError message={errors.nama_admin} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="username" value="Username" />
                                <TextInput
                                    id="username"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                                <InputError message={errors.username} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Kata Sandi Baru" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Kosongkan jika tidak ingin mengubah kata sandi.
                                </p>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Konfirmasi Kata Sandi Baru"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <Link
                                    href={route('akun-admin.index')}
                                    className="text-sm text-gray-600 underline hover:text-gray-900"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    Perbarui
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
