import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PasswordInput from '@/Components/PasswordInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import MainLayout from '@/Layouts/MainLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_admin: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onSuccess: () => reset(),
            onError: () => reset('password', 'password_confirmation'),
        });
    };

    const inputThemeClass =
        'mt-1 block w-full !border-[#45475a] !bg-[#1e1e2e] !text-[#cdd6f4] placeholder:!text-[#6c7086] focus:!border-[#cba6f7] focus:!ring-[#cba6f7]';

    return (
        <MainLayout title="Daftarkan Akun Admin">
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-0">
                <div>
                    <Link href={route('dashboard')}>
                        <ApplicationLogo className="h-20 w-20 fill-current text-[#f38ba8]" />
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden border border-[#313244] bg-[#181825] px-6 py-4 shadow-md shadow-[#11111b]/50 sm:max-w-md sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel
                                htmlFor="nama_admin"
                                value="Nama Admin"
                                className="!text-[#cdd6f4]"
                            />

                            <TextInput
                                id="nama_admin"
                                name="nama_admin"
                                value={data.nama_admin}
                                className={inputThemeClass}
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('nama_admin', e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.nama_admin}
                                className="mt-2 !text-[#f38ba8]"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="username"
                                value="Username"
                                className="!text-[#cdd6f4]"
                            />

                            <TextInput
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className={inputThemeClass}
                                autoComplete="username"
                                onChange={(e) =>
                                    setData('username', e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.username}
                                className="mt-2 !text-[#f38ba8]"
                            />
                        </div>

                        <div className="mt-4 [&_button:hover]:!text-[#cdd6f4] [&_button]:!text-[#a6adc8]">
                            <InputLabel
                                htmlFor="password"
                                value="Kata Sandi"
                                className="!text-[#cdd6f4]"
                            />

                            <PasswordInput
                                id="password"
                                name="password"
                                value={data.password}
                                className={inputThemeClass}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2 !text-[#f38ba8]"
                            />
                        </div>

                        <div className="mt-4 [&_button:hover]:!text-[#cdd6f4] [&_button]:!text-[#a6adc8]">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Konfirmasi Kata Sandi"
                                className="!text-[#cdd6f4]"
                            />

                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className={inputThemeClass}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 !text-[#f38ba8]"
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <PrimaryButton
                                className="!bg-[#cba6f7] !text-[#11111b] hover:!bg-[#b4befe] focus:!bg-[#b4befe] focus:!ring-[#cba6f7] focus:!ring-offset-[#181825] active:!bg-[#b4befe]"
                                disabled={processing}
                            >
                                Daftarkan Admin
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
