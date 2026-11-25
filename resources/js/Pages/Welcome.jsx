import { Head, Link, usePage } from '@inertiajs/react';

function LaravelLogo({ className = 'h-8 w-auto' }) {
    return (
        <svg
            viewBox="0 0 50 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.072-.093.023-.023.052-.04.078-.06.028-.023.054-.048.086-.066L10.01.107a.8.8 0 0 1 .8 0l9.612 5.536c.032.018.058.043.086.066.026.02.055.037.078.06.028.028.049.061.072.093.018.024.04.045.055.071.022.039.036.082.051.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611V11.773c0-.072.01-.142.028-.21.007-.023.02-.044.029-.067.015-.042.028-.085.05-.124.015-.026.037-.047.055-.071.023-.032.044-.065.072-.093.023-.023.052-.04.078-.06.028-.023.054-.048.086-.066l9.612-5.536a.8.8 0 0 1 .8 0l9.612 5.536c.032.018.058.043.086.066.026.02.055.037.078.06.028.028.049.061.072.093.018.024.04.045.055.071.022.039.036.082.05.124.009.023.022.044.029.068ZM48.052 22.283v-9.124l-3.363 1.937-4.646 2.675v9.124l8.009-4.612Zm-9.61 16.505v-9.131l-4.57 2.61-13.05 7.452v9.218l17.62-10.149ZM1.602 7.721v31.067l17.619 10.149v-9.216l-9.21-5.213-.003-.002h-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.059l-.002-.002c-.027-.027-.048-.06-.07-.091-.02-.026-.042-.048-.058-.076v-.002c-.022-.038-.035-.08-.05-.121-.009-.025-.023-.047-.03-.073a.805.805 0 0 1-.027-.207V12.333L4.965 9.658 1.602 7.721Zm8.809-5.995L2.404 6.337l8.007 4.611 8.008-4.611-8.008-4.611ZM14.57 29.88l4.651-2.679V7.721l-3.363 1.937-4.645 2.675V31.81l3.357-1.93Zm24.67-22.715-8.008 4.611 8.008 4.611 8.008-4.611-8.008-4.611Zm-.8 10.608-4.646-2.675-3.363-1.937v9.124l4.645 2.675 3.364 1.937v-9.124Zm-18.42 20.562 11.745-6.707 5.864-3.349-8.003-4.609-9.208 5.302-8.4 4.837 8.002 4.526Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function Welcome() {
    const { auth } = usePage().props;
    const isLoggedIn = Boolean(auth?.user);

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen flex flex-col bg-[#1e1e2e] text-[#cdd6f4] selection:bg-[#cba6f7] selection:text-[#11111b]">
                {/* Navbar */}
                <header className="sticky top-0 z-10 border-b border-[#313244] bg-[#181825]/90 backdrop-blur-md">
                    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Kiri: Logo Laravel + Text Button Dashboard & Klaim */}
                        <div className="flex items-center gap-6">
                            <Link
                                href={route('dashboard')}
                                className="flex items-center text-[#f38ba8] transition hover:opacity-85"
                                aria-label="Beranda"
                            >
                                <LaravelLogo className="h-8 w-auto" />
                            </Link>

                            <div className="flex items-center gap-1">
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-[#313244] px-3.5 py-2 text-sm font-medium text-[#cba6f7] transition hover:bg-[#45475a]"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={isLoggedIn ? '/admin/klaim' : '/klaim/cek'}
                                    className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#a6adc8] transition hover:bg-[#313244] hover:text-[#cdd6f4]"
                                >
                                    Klaim
                                </Link>
                            </div>
                        </div>

                        {/* Kanan: Log in & Register (redirect mengikuti kondisi default Laravel) */}
                        <div className="flex items-center gap-3">
                            <Link
                                href={route('login')}
                                className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#cdd6f4] transition hover:bg-[#313244] hover:text-[#b4befe]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-lg bg-[#cba6f7] px-4 py-2 text-sm font-semibold text-[#11111b] transition hover:bg-[#b4befe]"
                            >
                                Register
                            </Link>

                            {isLoggedIn && (
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="rounded-lg border border-[#45475a] px-3.5 py-2 text-sm font-medium text-[#f38ba8] transition hover:bg-[#313244]"
                                >
                                    Log out
                                </Link>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Konten Dashboard */}
                <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                    <div className="relative flex flex-col items-center gap-5">
                        <div className="rounded-2xl border border-[#313244] bg-[#181825] p-6 shadow-xl shadow-[#11111b]/50">
                            <LaravelLogo className="h-16 w-auto text-[#f38ba8]" />
                        </div>

                        <p className="text-lg font-medium tracking-wide text-[#cdd6f4]">
                            anda sekarang di dashboard
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}