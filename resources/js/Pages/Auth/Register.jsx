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
        'mt-1 block w-full !border-[#ccd0da] !bg-[#f8fafc] !text-[#1e1e2e] placeholder:!text-[#8c8fa1] focus:!border-[#8839ef] focus:!ring-[#8839ef] dark:!border-[#45475a] dark:!bg-[#1e1e2e] dark:!text-[#cdd6f4] dark:placeholder:!text-[#6c7086] dark:focus:!border-[#cba6f7] dark:focus:!ring-[#cba6f7]';

    return (
        <MainLayout title="Daftarkan Akun Admin">
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
                <div>
                    <Link href={route('dashboard')}>
                        <ApplicationLogo className="h-20 w-20 fill-current text-[#e11d48] dark:text-[#f38ba8]" />
                    </Link>
                </div>

                <div className="mt-6 w-full max-w-md overflow-hidden rounded-xl border border-[#ccd0da] bg-white px-6 py-5 shadow-xl shadow-slate-900/5 transition-colors duration-200 dark:border-[#313244] dark:bg-[#181825] dark:shadow-[#11111b]/50">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel
                                htmlFor="nama_admin"
                                value="Nama Admin"
                                className="!text-[#1e1e2e] dark:!text-[#cdd6f4]"
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
                                className="mt-2 !text-[#e11d48] dark:!text-[#f38ba8]"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="username"
                                value="Username"
                                className="!text-[#1e1e2e] dark:!text-[#cdd6f4]"
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
                                className="mt-2 !text-[#e11d48] dark:!text-[#f38ba8]"
                            />
                        </div>

                        <div className="mt-4 [&_button:hover]:!text-[#1e1e2e] [&_button]:!text-[#6c6f85] dark:[&_button:hover]:!text-[#cdd6f4] dark:[&_button]:!text-[#a6adc8]">
                            <InputLabel
                                htmlFor="password"
                                value="Kata Sandi"
                                className="!text-[#1e1e2e] dark:!text-[#cdd6f4]"
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
                                className="mt-2 !text-[#e11d48] dark:!text-[#f38ba8]"
                            />
                        </div>

                        <div className="mt-4 [&_button:hover]:!text-[#1e1e2e] [&_button]:!text-[#6c6f85] dark:[&_button:hover]:!text-[#cdd6f4] dark:[&_button]:!text-[#a6adc8]">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Konfirmasi Kata Sandi"
                                className="!text-[#1e1e2e] dark:!text-[#cdd6f4]"
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
                                className="mt-2 !text-[#e11d48] dark:!text-[#f38ba8]"
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                            <PrimaryButton
                                className="!bg-[#8839ef] !text-white hover:!bg-[#7c3aed] focus:!bg-[#7c3aed] focus:!ring-[#8839ef] focus:!ring-offset-white active:!bg-[#6d28d9] dark:!bg-[#cba6f7] dark:!text-[#11111b] dark:hover:!bg-[#b4befe] dark:focus:!bg-[#b4befe] dark:focus:!ring-[#cba6f7] dark:focus:!ring-offset-[#181825] dark:active:!bg-[#b4befe]"
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
