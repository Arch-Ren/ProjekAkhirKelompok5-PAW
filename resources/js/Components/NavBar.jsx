import { Link, usePage } from '@inertiajs/react';
import LaravelLogo from '@/Components/LaravelLogo';

export default function Navbar() {
    const { url, props } = usePage();
    const isLoggedIn = Boolean(props.auth?.user);

    const isDashboard = isLoggedIn
        ? url.startsWith('/dashboard')
        : url === '/';
    const isKlaim = url.startsWith('/klaim') || url.startsWith('/admin/klaim');
    const isRegister = url.startsWith('/register');
    const isProfile = url.startsWith('/profile');

    const navButtonClass = (active) =>
        `rounded-lg px-3.5 py-2 text-sm font-medium transition ${
            active
                ? 'bg-[#313244] text-[#cba6f7]'
                : 'text-[#a6adc8] hover:bg-[#313244] hover:text-[#cdd6f4]'
        }`;

    return (
        <header className="sticky top-0 z-20 border-b border-[#313244] bg-[#181825]/90 backdrop-blur-md">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Kiri: Logo Laravel + Dashboard & Klaim */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center text-[#f38ba8] transition hover:opacity-85"
                        aria-label="Beranda"
                    >
                        <LaravelLogo className="h-8 w-auto" />
                    </Link>

                    <div className="flex items-center gap-1">
                        <Link
                            href={isLoggedIn ? route('dashboard') : '/'}
                            className={navButtonClass(isDashboard)}
                        >
                            Dashboard
                        </Link>
                        {isLoggedIn && (
                            <Link
                                href="/klaim"
                                className={navButtonClass(isKlaim)}
                            >
                                Klaim
                            </Link>
                        )}
                    </div>
                </div>

                {/* Kanan: Profil, Register & Log out jika login; hanya Log in jika belum login */}
                <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                        <>
                            <Link
                                href={route('profile.edit')}
                                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                                    isProfile
                                        ? 'bg-[#313244] text-[#cba6f7]'
                                        : 'text-[#cdd6f4] hover:bg-[#313244] hover:text-[#b4befe]'
                                }`}
                            >
                                Profil
                            </Link>
                            <Link
                                href={route('register')}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                    isRegister
                                        ? 'bg-[#b4befe] text-[#11111b]'
                                        : 'bg-[#cba6f7] text-[#11111b] hover:bg-[#b4befe]'
                                }`}
                            >
                                Register
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-lg border border-[#45475a] px-3.5 py-2 text-sm font-medium text-[#f38ba8] transition hover:bg-[#313244]"
                            >
                                Log out
                            </Link>
                        </>
                    ) : (
                        <Link
                            href={route('login')}
                            className="rounded-lg bg-[#cba6f7] px-4 py-2 text-sm font-semibold text-[#11111b] transition hover:bg-[#b4befe]"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}