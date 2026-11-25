import { useEffect, useState } from 'react';

function getCurrentDarkState() {
    if (typeof document === 'undefined') {
        return true;
    }

    return document.documentElement.classList.contains('dark');
}

export default function ThemeToggle({ className = '' }) {
    const [isDark, setIsDark] = useState(getCurrentDarkState);

    useEffect(() => {
        const syncTheme = () => setIsDark(getCurrentDarkState());
        window.addEventListener('theme-change', syncTheme);
        window.addEventListener('storage', syncTheme);

        return () => {
            window.removeEventListener('theme-change', syncTheme);
            window.removeEventListener('storage', syncTheme);
        };
    }, []);

    const toggleTheme = () => {
        const nextDark = !getCurrentDarkState();
        document.documentElement.classList.toggle('dark', nextDark);
        localStorage.setItem('theme', nextDark ? 'dark' : 'light');
        window.dispatchEvent(new Event('theme-change'));
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            className={`inline-flex items-center justify-center rounded-lg border border-[#ccd0da] bg-white p-2 text-[#4c4f69] transition hover:bg-[#e6e9ef] hover:text-[#7c3aed] focus:outline-none focus:ring-2 focus:ring-[#8839ef]/40 dark:border-[#313244] dark:bg-[#181825] dark:text-[#cdd6f4] dark:hover:bg-[#313244] dark:hover:text-[#cba6f7] dark:focus:ring-[#cba6f7]/50 ${className}`}
        >
            {isDark ? (
                /* Ikon Matahari (klik untuk ke Light Mode) */
                <svg
                    className="h-5 w-5 text-[#f9e2af]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                </svg>
            ) : (
                /* Ikon Bulan (klik untuk ke Dark Mode) */
                <svg
                    className="h-5 w-5 text-[#7c3aed]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                </svg>
            )}
        </button>
    );
}
