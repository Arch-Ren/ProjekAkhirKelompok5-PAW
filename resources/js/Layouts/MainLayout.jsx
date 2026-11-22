import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/NavBar';

export default function MainLayout({ title, children }) {
    const { flash } = usePage().props;

    return (
        <>
            {title && <Head title={title} />}

            <div className="flex min-h-screen flex-col bg-[#1e1e2e] text-[#cdd6f4] selection:bg-[#cba6f7] selection:text-[#11111b]">
                {/* Navbar dari file tersendiri */}
                <Navbar />

                {/* Flash message sukses (konvensi session('success')) */}
                {flash?.success && (
                    <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-xl border border-[#a6e3a1]/30 bg-[#a6e3a1]/10 px-4 py-3 text-sm text-[#a6e3a1]">
                            {flash.success}
                        </div>
                    </div>
                )}

                {/* Elemen halaman yang dipanggil */}
                <main className="flex flex-1 flex-col">{children}</main>
            </div>
        </>
    );
}