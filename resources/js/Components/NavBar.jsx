import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import LaravelLogo from '@/Components/LaravelLogo';

export default function Navbar() {
    const { url, props } = usePage();
    const isLoggedIn = Boolean(props.auth?.user);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isDashboard = isLoggedIn
        ? url.startsWith('/dashboard')
        : url === '/';
    const isKlaim = url.startsWith('/klaim') || url.startsWith('/admin/klaim');
    const isLaporanKehilangan =
        url.startsWith('/laporan-kehilangan') ||
        url.startsWith('/admin/laporan-kehilangan');
    const isBarangTemuan =
        url.startsWith('/barang-temuan') ||
        url.startsWith('/admin/barang-temuan');
    const isRegister = url.startsWith('/register');
    const isProfile = url.startsWith('/profile');

    // Daftar menu utama saat sudah login (mudah ditambah untuk fitur berikutnya)
    const adminNavItems = [
        { label: 'Dashboard', href: route('dashboard'), active: isDashboard },
        { label: 'Klaim', href: '/admin/klaim', active: isKlaim },
        {
            label: 'Laporan Kehilangan',
            href: '/admin/laporan-kehilangan',
            active: isLaporanKehilangan,
        },
        {
            label: 'Barang Temuan',
            href: '/admin/barang-temuan',
            active: isBarangTemuan,
        },
    ];

    const navButtonClass = (active) =>
        `whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
            active
                ? 'bg-[#313244] text-[#cba6f7]'
                : 'text-[#a6adc8] hover:bg-[#313244] hover:text-[#cdd6f4]'
        }`;

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            {/* Overlay klik di luar untuk menutup dropdown mobile */}
            {isLoggedIn && mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-[#11111b]/40 lg:hidden"
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}

            <header className="sticky top-0 z-30 border-b border-[#313244] bg-[#181825]/90 backdrop-blur-md">
                <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Kiri: Logo + menu navigasi */}
                    <div className="flex items-center gap-3 lg:gap-6">
                        <Link
                            href="/"
                            onClick={closeMobileMenu}
                            className="flex items-center text-[#f38ba8] transition hover:opacity-85"
                            aria-label="Beranda"
                        >
                            <LaravelLogo className="h-8 w-auto" />
                        </Link>

                        {isLoggedIn ? (
                            /* Sudah login: di layar >= lg tampil sejajar; di < lg pindah ke dropdown hamburger */
                            <div className="hidden items-center gap-1 lg:flex">
                                {adminNavItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={navButtonClass(item.active)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            /* Belum login: Dashboard selalu menempel di kiri (tanpa hamburger) */
                            <div className="flex items-center gap-1">
                                <Link
                                    href="/"
                                    className={navButtonClass(isDashboard)}
                                >
                                    Dashboard
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Kanan */}
                    {isLoggedIn ? (
                        <>
                            {/* Desktop (>= lg): Profil, Register, Log out */}
                            <div className="hidden items-center gap-3 lg:flex">
                                <Link
                                    href={route('profile.edit')}
                                    className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                                        isProfile
                                            ? 'bg-[#313244] text-[#cba6f7]'
                                            : 'text-[#cdd6f4] hover:bg-[#313244] hover:text-[#b4befe]'
                                    }`}
                                >
                                    Profil
                                </Link>
                                <Link
                                    href={route('register')}
                                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
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
                                    className="whitespace-nowrap rounded-lg border border-[#45475a] px-3.5 py-2 text-sm font-medium text-[#f38ba8] transition hover:bg-[#313244]"
                                >
                                    Log out
                                </Link>
                            </div>

                            {/* Layar < lg: tombol hamburger */}
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen((prev) => !prev)
                                }
                                aria-expanded={mobileMenuOpen}
                                aria-label="Toggle menu navigasi"
                                className="inline-flex items-center justify-center rounded-lg border border-[#313244] p-2 text-[#cdd6f4] transition hover:bg-[#313244] hover:text-[#cba6f7] focus:outline-none focus:ring-2 focus:ring-[#cba6f7]/50 lg:hidden"
                            >
                                {mobileMenuOpen ? (
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                )}
                            </button>
                        </>
                    ) : (
                        /* Belum login: hanya Log in menempel di kanan (tanpa hamburger) */
                        <div className="flex items-center">
                            <Link
                                href={route('login')}
                                className="whitespace-nowrap rounded-lg bg-[#cba6f7] px-4 py-2 text-sm font-semibold text-[#11111b] transition hover:bg-[#b4befe]"
                            >
                                Log in
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Dropdown Hamburger mengambang (overlay, tidak mendorong konten halaman) */}
                {isLoggedIn && (
                    <Transition
                        show={mobileMenuOpen}
                        enter="transition ease-out duration-150"
                        enterFrom="opacity-0 -translate-y-2"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-2"
                    >
                        <div className="absolute inset-x-0 top-full z-30 border-b border-[#313244] bg-[#181825]/95 px-4 pb-4 pt-3 shadow-xl shadow-[#11111b]/60 backdrop-blur-md lg:hidden">
                            {/* Bagian Atas: Dashboard, Klaim, dst. */}
                            <div className="flex flex-col gap-1">
                                {adminNavItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className={`block w-full text-left ${navButtonClass(item.active)}`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Bagian Bawah Kanan: Profil, Register, Log out */}
                            <div className="mt-3 flex flex-wrap items-center justify-end gap-2 border-t border-[#313244] pt-3">
                                <Link
                                    href={route('profile.edit')}
                                    onClick={closeMobileMenu}
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
                                    onClick={closeMobileMenu}
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
                                    onClick={closeMobileMenu}
                                    className="rounded-lg border border-[#45475a] px-3.5 py-2 text-sm font-medium text-[#f38ba8] transition hover:bg-[#313244]"
                                >
                                    Log out
                                </Link>
                            </div>
                        </div>
                    </Transition>
                )}
            </header>
        </>
    );
}