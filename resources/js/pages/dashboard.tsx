import { PetContent } from '@/components/pet-content';
import { PetWithSchedule } from '@/components/pet-with-schedule';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type Pet } from '@/types';
import { Head } from '@inertiajs/react';

interface DashboardProps {
    pets: Pet[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ pets }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Pets Section */}
                <PetWithSchedule pets={pets} />
                
                {/* Pet Content Section */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PetContent species="cat" className="absolute inset-0 size-full" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PetContent species="dog" className="absolute inset-0 size-full" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PetContent species="cat" className="absolute inset-0 size-full" />
                    </div>
                </div>
                
                {/* Large Pet Content */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PetContent species="dog" className="absolute inset-0 size-full" />
                </div>
            </div>
        </AppLayout>
    );
}
