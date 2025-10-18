import AppLayout from '@/layouts/app-layout';
import { user } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: user().url,
    },
];

export default function User() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">User</h1>
                </div>
                
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6">
                    <div className="text-center text-muted-foreground">
                        <p className="text-lg">Client page coming soon...</p>
                        <p className="text-sm mt-2">This is a simple client page placeholder.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
