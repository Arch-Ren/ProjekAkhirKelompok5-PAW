import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PasswordInput from '@/Components/PasswordInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
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
        'mt-1 block w-full !border-[#45475a] !bg-[#1e1e2e] !text-[#cdd6f4] placeholder:!text-[#6c7086] focus:!border-[#cba6f7] focus:!ring-[#cba6f7]';

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#1e1e2e] pt-6 text-[#cdd6f4] selection:bg-[#cba6f7] selection:text-[#11111b] sm:justify-center sm:pt-0">
            <Head title="Log in" />

            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-[#f38ba8]" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden border border-[#313244] bg-[#181825] px-6 py-4 shadow-md shadow-[#11111b]/50 sm:max-w-md sm:rounded-lg">
                {status && (
                    <div className="mb-4 text-sm font-medium text-[#a6e3a1]">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
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
                            isFocused={true}
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
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
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 !text-[#f38ba8]"
                        />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                className="!border-[#45475a] !bg-[#1e1e2e] !text-[#cba6f7] focus:!ring-[#cba6f7] focus:!ring-offset-[#181825]"
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-[#a6adc8]">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-[#a6adc8] underline hover:text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#cba6f7] focus:ring-offset-2 focus:ring-offset-[#181825]"
                            >
                                Forgot password?
                            </Link>
                        )}

                        <PrimaryButton
                            className="ms-4 !bg-[#cba6f7] !text-[#11111b] hover:!bg-[#b4befe] focus:!bg-[#b4befe] focus:!ring-[#cba6f7] focus:!ring-offset-[#181825] active:!bg-[#b4befe]"
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
