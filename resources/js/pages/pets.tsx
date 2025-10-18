import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Eye, 
    PawPrint,
    Calendar,
    Weight,
    Palette
} from 'lucide-react';
import { useState } from 'react';

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
}

interface Species {
    value: string;
    label: string;
}

interface PetsProps {
    pets: Pet[];
    species: Species[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pets',
        href: '/pets',
    },
];

export default function Pets({ pets, species }: PetsProps) {
    const [deletingPet, setDeletingPet] = useState<number | null>(null);

    const handleDelete = (petId: number) => {
        if (confirm('Are you sure you want to delete this pet?')) {
            setDeletingPet(petId);
            router.delete(`/pets/${petId}`, {
                onFinish: () => setDeletingPet(null),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Pets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Pets</h1>
                    <Link href="/pets/create">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Pet
                        </Button>
                    </Link>
                </div>
                
                {pets.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <PawPrint className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">No pets yet</h3>
                            <p className="text-gray-500 mb-4">Start by adding your first pet to get started!</p>
                            <Link href="/pets/create">
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Pet
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pets.map((pet) => (
                            <Card key={pet.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {pet.avatar ? (
                                                <img 
                                                    src={`/storage/${pet.avatar}`} 
                                                    alt={pet.name}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <PawPrint className="h-6 w-6 text-gray-400" />
                                                </div>
                                            )}
                                            <CardTitle className="text-lg">
                                                {pet.name}
                                            </CardTitle>
                                        </div>
                                        <Badge variant={pet.gender === 'Male' ? 'default' : 'secondary'}>
                                            {pet.gender}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-gray-500">Species:</span>
                                            <p className="font-medium">{pet.species}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Breed:</span>
                                            <p className="font-medium">{pet.breed}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                            <span className="text-gray-500">Age:</span>
                                            <p className="font-medium ml-1">{pet.age}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <Weight className="h-4 w-4 text-gray-400 mr-1" />
                                            <span className="text-gray-500">Weight:</span>
                                            <p className="font-medium ml-1">{pet.weight}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <Palette className="h-4 w-4 text-gray-400 mr-1" />
                                        <span className="text-gray-500">Color:</span>
                                        <p className="font-medium ml-1">{pet.color}</p>
                                    </div>
                                    
                                    {pet.notes && (
                                        <div className="pt-2 border-t">
                                            <span className="text-gray-500 text-sm">Notes:</span>
                                            <p className="text-sm mt-1">{pet.notes}</p>
                                        </div>
                                    )}
                                    
                                    <div className="flex space-x-2 pt-3">
                                        <Link href={`/pets/${pet.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/pets/${pet.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => handleDelete(pet.id)}
                                            disabled={deletingPet === pet.id}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
