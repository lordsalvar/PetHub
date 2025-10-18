import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Stethoscope, FileText, User, Edit, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Pet, type PetRecord } from '@/types';
import { index, edit } from '@/routes/pet-records';

interface PetRecordShowProps {
    pet: Pet;
    petRecord: PetRecord;
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
    {
        title: 'View Record',
        href: '#',
    },
];

export default function PetRecordShow({ pet, petRecord }: PetRecordShowProps) {
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
            <Head title={`${pet.name} - Record Details`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={index({ pet: pet.id }).url}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Records
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Record Details</h1>
                            <p className="text-muted-foreground">
                                Veterinary record for {pet.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={edit({ pet: pet.id, pet_record: petRecord.id }).url}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Record
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Pet Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-lg">{pet.species === 'cat' ? '🐱' : '🐶'}</span>
                                Pet Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Name:</span> {pet.name}
                                </div>
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
                                <div>
                                    <span className="font-medium">Color:</span> {pet.color}
                                </div>
                            </div>
                            {pet.notes && (
                                <div className="mt-4">
                                    <span className="font-medium">Notes:</span>
                                    <p className="text-sm text-muted-foreground mt-1">{pet.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Record Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Visit Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Visit Date */}
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <span className="font-medium">Visit Date:</span>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(petRecord.visit_date)}
                                    </p>
                                </div>
                            </div>

                            {/* Type of Visit */}
                            <div className="flex items-center gap-3">
                                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <span className="font-medium">Type of Visit:</span>
                                    <div className="mt-1">
                                        <Badge className={getVisitTypeColor(petRecord.type_of_visit)}>
                                            {petRecord.type_of_visit}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Veterinarian */}
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <span className="font-medium">Veterinarian:</span>
                                    <p className="text-sm text-muted-foreground">
                                        Dr. {petRecord.vet_name}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex items-start gap-3">
                                <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                                <div className="flex-1">
                                    <span className="font-medium">Description:</span>
                                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                                        {petRecord.description}
                                    </p>
                                </div>
                            </div>

                            {/* Record Dates */}
                            <div className="pt-4 border-t">
                                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                                    <div>
                                        <span className="font-medium">Created:</span>
                                        <p>{new Date(petRecord.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium">Last Updated:</span>
                                        <p>{new Date(petRecord.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
