import MainLayout from '@/Layouts/MainLayout';
import LaravelLogo from '@/Components/LaravelLogo';

export default function Dashboard() {
    return (
        <MainLayout title="Dashboard">
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="rounded-2xl border border-[#ccd0da] bg-white p-6 shadow-xl shadow-slate-900/5 transition-colors duration-200 dark:border-[#313244] dark:bg-[#181825] dark:shadow-[#11111b]/50">
                        <LaravelLogo className="h-16 w-auto text-[#e11d48] dark:text-[#f38ba8]" />
                    </div>

                    <p className="text-lg font-medium tracking-wide text-[#1e1e2e] dark:text-[#cdd6f4]">
                        anda sekarang di dashboard
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
