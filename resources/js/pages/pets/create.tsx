import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface Pet {
    id?: number;
    name: string;
    species: string;
    breed: string;
    gender: string;
    age: string;
    weight: string;
    color: string;
    notes?: string;
    avatar?: string;
}

interface Species {
    value: string;
    label: string;
}

interface PetFormProps {
    pet?: Pet;
    isEdit?: boolean;
    species: Species[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pets',
        href: '/pets',
    },
    {
        title: 'Add Pet',
        href: '/pets/create',
    },
];

export default function PetForm({ pet, isEdit = false, species }: PetFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: pet?.name || '',
        species: pet?.species || '',
        breed: pet?.breed || '',
        gender: pet?.gender || '',
        age: pet?.age || '',
        weight: pet?.weight || '',
        color: pet?.color || '',
        notes: pet?.notes || '',
        avatar: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && pet?.id) {
            put(`/pets/${pet.id}`);
        } else {
            post('/pets');
        }
    };

    const breadcrumbTitle = isEdit ? 'Edit Pet' : 'Add Pet';
    const pageTitle = isEdit ? 'Edit Pet' : 'Add New Pet';
    const submitButtonText = isEdit ? 'Update Pet' : 'Add Pet';

    return (
        <AppLayout breadcrumbs={[
            { title: 'Pets', href: '/pets' },
            { title: breadcrumbTitle, href: isEdit ? `/pets/${pet?.id}/edit` : '/pets/create' }
        ]}>
            <Head title={pageTitle} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/pets">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Pets
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">{pageTitle}</h1>
                    </div>
                </div>
                
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Pet Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Pet Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter pet name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="species">Species *</Label>
                                    <Select value={data.species || undefined} onValueChange={(value) => setData('species', value)}>
                                        <SelectTrigger id="species" className={errors.species ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select species" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {species.map((specie) => (
                                                <SelectItem key={specie.value} value={specie.value}>
                                                    {specie.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.species && <p className="text-sm text-red-500">{errors.species}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="breed">Breed *</Label>
                                    <Input
                                        id="breed"
                                        value={data.breed}
                                        onChange={(e) => setData('breed', e.target.value)}
                                        placeholder="Enter breed"
                                        className={errors.breed ? 'border-red-500' : ''}
                                    />
                                    {errors.breed && <p className="text-sm text-red-500">{errors.breed}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender *</Label>
                                    <Select value={data.gender || undefined} onValueChange={(value) => setData('gender', value)}>
                                        <SelectTrigger id="gender" className={errors.gender ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="age">Age *</Label>
                                    <Input
                                        id="age"
                                        value={data.age}
                                        onChange={(e) => setData('age', e.target.value)}
                                        placeholder="e.g., 2 years, 6 months"
                                        className={errors.age ? 'border-red-500' : ''}
                                    />
                                    {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight *</Label>
                                    <Input
                                        id="weight"
                                        value={data.weight}
                                        onChange={(e) => setData('weight', e.target.value)}
                                        placeholder="e.g., 15 lbs, 7 kg"
                                        className={errors.weight ? 'border-red-500' : ''}
                                    />
                                    {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="color">Color *</Label>
                                <Input
                                    id="color"
                                    value={data.color}
                                    onChange={(e) => setData('color', e.target.value)}
                                    placeholder="Enter color"
                                    className={errors.color ? 'border-red-500' : ''}
                                />
                                {errors.color && <p className="text-sm text-red-500">{errors.color}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="avatar">Pet Avatar</Label>
                                <Input
                                    id="avatar"
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/jfif"
                                    onChange={(e) => setData('avatar', e.target.files?.[0] || null)}
                                    className={errors.avatar ? 'border-red-500' : ''}
                                />
                                {errors.avatar && <p className="text-sm text-red-500">{errors.avatar}</p>}
                                <p className="text-sm text-gray-500">Upload a photo of your pet</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Any additional notes about your pet..."
                                    rows={4}
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/pets">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing} className="bg-blue-500 hover:bg-blue-600">
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? 'Saving...' : submitButtonText}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
