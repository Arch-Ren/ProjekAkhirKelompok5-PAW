import MainLayout from '@/Layouts/MainLayout';
import LaravelLogo from '@/Components/LaravelLogo';

export default function Index() {
    return (
        <MainLayout title="Laporan Kehilangan">
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="rounded-2xl border border-[#313244] bg-[#181825] p-6 shadow-xl shadow-[#11111b]/50">
                        <LaravelLogo className="h-16 w-auto text-[#f38ba8]" />
                    </div>

                    <p className="text-lg font-medium tracking-wide text-[#cdd6f4]">
                        Anda sekarang di Laporan Kehilangan
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
