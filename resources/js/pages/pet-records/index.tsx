import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Edit, Trash2, Eye } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Pet, type PetRecord } from '@/types';
import { create, show, edit, destroy } from '@/routes/pet-records';

interface PetRecordsIndexProps {
    pet: Pet;
    petRecords: PetRecord[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pets',
        href: '/pets',
    },
    {
        title: 'Records',
        href: '#',
    },
];

export default function PetRecordsIndex({ pet, petRecords }: PetRecordsIndexProps) {
    const handleDelete = (recordId: number) => {
        if (confirm('Are you sure you want to delete this record?')) {
            router.delete(destroy({ pet: pet.id, pet_record: recordId }).url);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getVisitTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            'Checkup': 'bg-blue-100 text-blue-800',
            'Vaccination': 'bg-green-100 text-green-800',
            'Emergency': 'bg-red-100 text-red-800',
            'Surgery': 'bg-purple-100 text-purple-800',
            'Dental': 'bg-yellow-100 text-yellow-800',
            'Grooming': 'bg-pink-100 text-pink-800',
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${pet.name} - Records`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{pet.name}'s Records</h1>
                        <p className="text-muted-foreground">
                            Manage veterinary records for {pet.name}
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create({ pet: pet.id }).url}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Record
                        </Link>
                    </Button>
                </div>

                {/* Pet Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-lg">{pet.species === 'cat' ? '🐱' : '🐶'}</span>
                            Pet Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="font-medium">Species:</span> {pet.species}
                            </div>
                            <div>
                                <span className="font-medium">Breed:</span> {pet.breed}
                            </div>
                            <div>
                                <span className="font-medium">Age:</span> {pet.age}
                            </div>
                            <div>
                                <span className="font-medium">Weight:</span> {pet.weight}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Records List */}
                {petRecords.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Records Yet</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Start tracking {pet.name}'s veterinary visits and health records.
                            </p>
                            <Button asChild>
                                <Link href={create({ pet: pet.id }).url}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Record
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {petRecords.map((record) => (
                            <Card key={record.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <CardTitle className="text-lg">
                                                    {formatDate(record.visit_date)}
                                                </CardTitle>
                                                <CardDescription>
                                                    Dr. {record.vet_name}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={getVisitTypeColor(record.type_of_visit)}>
                                                {record.type_of_visit}
                                            </Badge>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={show({ pet: pet.id, pet_record: record.id }).url}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={edit({ pet: pet.id, pet_record: record.id }).url}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(record.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {record.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
