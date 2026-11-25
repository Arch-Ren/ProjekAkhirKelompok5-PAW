import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PasswordInput from '@/Components/PasswordInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const inputThemeClass =
        'mt-1 block w-full !border-[#ccd0da] !bg-[#f8fafc] !text-[#1e1e2e] placeholder:!text-[#8c8fa1] focus:!border-[#8839ef] focus:!ring-[#8839ef] dark:!border-[#45475a] dark:!bg-[#1e1e2e] dark:!text-[#cdd6f4] dark:placeholder:!text-[#6c7086] dark:focus:!border-[#cba6f7] dark:focus:!ring-[#cba6f7]';

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#eff1f5] px-4 py-8 text-[#1e1e2e] transition-colors duration-200 selection:bg-[#8839ef] selection:text-white sm:px-6 sm:py-10 dark:bg-[#1e1e2e] dark:text-[#cdd6f4] dark:selection:bg-[#cba6f7] dark:selection:text-[#11111b]">
            <Head title="Log in" />

            <div className="fixed right-4 top-4 sm:right-6 sm:top-6">
                <ThemeToggle />
            </div>

            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-[#e11d48] dark:text-[#f38ba8]" />
                </Link>
            </div>

            <div className="mt-6 w-full max-w-md overflow-hidden rounded-xl border border-[#ccd0da] bg-white px-6 py-5 shadow-xl shadow-slate-900/5 transition-colors duration-200 dark:border-[#313244] dark:bg-[#181825] dark:shadow-[#11111b]/50">
                {status && (
                    <div className="mb-4 text-sm font-medium text-emerald-600 dark:text-[#a6e3a1]">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
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
                            isFocused={true}
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
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
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 !text-[#e11d48] dark:!text-[#f38ba8]"
                        />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                className="!border-[#ccd0da] !bg-[#f8fafc] !text-[#8839ef] focus:!ring-[#8839ef] focus:!ring-offset-white dark:!border-[#45475a] dark:!bg-[#1e1e2e] dark:!text-[#cba6f7] dark:focus:!ring-[#cba6f7] dark:focus:!ring-offset-[#181825]"
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-[#5c5f77] dark:text-[#a6adc8]">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-[#5c5f77] underline hover:text-[#1e1e2e] focus:outline-none focus:ring-2 focus:ring-[#8839ef] focus:ring-offset-2 focus:ring-offset-white dark:text-[#a6adc8] dark:hover:text-[#cdd6f4] dark:focus:ring-[#cba6f7] dark:focus:ring-offset-[#181825]"
                            >
                                Forgot password?
                            </Link>
                        )}

                        <PrimaryButton
                            className="ms-4 !bg-[#8839ef] !text-white hover:!bg-[#7c3aed] focus:!bg-[#7c3aed] focus:!ring-[#8839ef] focus:!ring-offset-white active:!bg-[#6d28d9] dark:!bg-[#cba6f7] dark:!text-[#11111b] dark:hover:!bg-[#b4befe] dark:focus:!bg-[#b4befe] dark:focus:!ring-[#cba6f7] dark:focus:!ring-offset-[#181825] dark:active:!bg-[#b4befe]"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
