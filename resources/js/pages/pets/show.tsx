import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PetRecord } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { create, index, show as showRecord } from '@/routes/pet-records';
import { 
    ArrowLeft, 
    Edit, 
    PawPrint,
    Calendar,
    Weight,
    Palette,
    FileText,
    User,
    Stethoscope,
    Plus,
    Eye
} from 'lucide-react';

interface Pet {
    id: number;
    name: string;
    species: string;
    breed: string;
    gender: string;
    age: string;
    weight: string;
    color: string;
    notes?: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
    pet_records?: PetRecord[];
}

interface ShowPetProps {
    pet: Pet;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pets',
        href: '/pets',
    },
];

export default function ShowPet({ pet }: ShowPetProps) {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Pets', href: '/pets' },
            { title: pet.name, href: `/pets/${pet.id}` }
        ]}>
            <Head title={`${pet.name} - Pet Details`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/pets">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Pets
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">{pet.name}</h1>
                    </div>
                    <Link href={`/pets/${pet.id}/edit`}>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Pet
                        </Button>
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Pet Info */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {pet.avatar ? (
                                            <img 
                                                src={`/storage/${pet.avatar}`} 
                                                alt={pet.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                <PawPrint className="h-8 w-8 text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <CardTitle className="text-xl">{pet.name}</CardTitle>
                                            <p className="text-gray-500">{pet.species} • {pet.breed}</p>
                                        </div>
                                    </div>
                                    <Badge variant={pet.gender === 'Male' ? 'default' : 'secondary'}>
                                        {pet.gender}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-medium text-gray-500">Species</Label>
                                            <p className="text-lg font-semibold">{pet.species}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-500">Breed</Label>
                                            <p className="text-lg font-semibold">{pet.breed}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                            <div>
                                                <Label className="text-sm font-medium text-gray-500">Age</Label>
                                                <p className="text-lg font-semibold">{pet.age}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Weight className="h-5 w-5 text-gray-400 mr-2" />
                                            <div>
                                                <Label className="text-sm font-medium text-gray-500">Weight</Label>
                                                <p className="text-lg font-semibold">{pet.weight}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Palette className="h-5 w-5 text-gray-400 mr-2" />
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Color</Label>
                                        <p className="text-lg font-semibold">{pet.color}</p>
                                    </div>
                                </div>
                                
                                {pet.notes && (
                                    <div className="pt-4 border-t">
                                        <div className="flex items-center mb-2">
                                            <FileText className="h-5 w-5 text-gray-400 mr-2" />
                                            <Label className="text-sm font-medium text-gray-500">Notes</Label>
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-wrap">{pet.notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                    <User className="h-5 w-5 mr-2 text-gray-500" />
                                    Quick Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Added</Label>
                                    <p className="text-sm">{new Date(pet.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                                    <p className="text-sm">{new Date(pet.updated_at).toLocaleDateString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={`/pets/${pet.id}/edit`} className="block">
                                    <Button variant="outline" className="w-full">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Pet
                                    </Button>
                                </Link>
                                <Link href="/pets" className="block">
                                    <Button variant="outline" className="w-full">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Back to All Pets
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Pet Records Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Stethoscope className="h-5 w-5" />
                                Veterinary Records
                            </CardTitle>
                            <div className="flex gap-2">
                                <Button asChild>
                                    <Link href={create({ pet: pet.id }).url}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Record
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={index({ pet: pet.id }).url}>
                                        View All Records
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {pet.pet_records && pet.pet_records.length > 0 ? (
                            <div className="space-y-4">
                                {pet.pet_records.slice(0, 3).map((record) => (
                                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">
                                                    {new Date(record.visit_date).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Dr. {record.vet_name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{record.type_of_visit}</Badge>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={showRecord({ pet: pet.id, pet_record: record.id }).url}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {pet.pet_records.length > 3 && (
                                    <div className="text-center pt-2">
                                        <Button variant="outline" asChild>
                                            <Link href={index({ pet: pet.id }).url}>
                                                View {pet.pet_records.length - 3} more records
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Records Yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start tracking {pet.name}'s veterinary visits and health records.
                                </p>
                                <Button asChild>
                                    <Link href={create({ pet: pet.id }).url}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add First Record
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

// Helper component for Label
function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <label className={`block ${className}`}>{children}</label>;
}
