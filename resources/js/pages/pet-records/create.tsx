import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Stethoscope, FileText, User } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Pet } from '@/types';
import { store, index } from '@/routes/pet-records';

interface PetRecordCreateProps {
    pet: Pet;
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
        title: 'Add Record',
        href: '#',
    },
];

const visitTypes = [
    'Checkup',
    'Vaccination',
    'Emergency',
    'Surgery',
    'Dental',
    'Grooming',
    'Behavioral',
    'Other',
];

export default function PetRecordCreate({ pet }: PetRecordCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        visit_date: '',
        type_of_visit: '',
        description: '',
        vet_name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store({ pet: pet.id }).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Add Record - ${pet.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={index({ pet: pet.id }).url}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Records
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Add New Record</h1>
                        <p className="text-muted-foreground">
                            Add a veterinary record for {pet.name}
                        </p>
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* Record Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Record Details</CardTitle>
                            <CardDescription>
                                Fill in the details of the veterinary visit
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Visit Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="visit_date" className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Visit Date
                                    </Label>
                                    <Input
                                        id="visit_date"
                                        type="date"
                                        value={data.visit_date}
                                        onChange={(e) => setData('visit_date', e.target.value)}
                                        className={errors.visit_date ? 'border-red-500' : ''}
                                    />
                                    {errors.visit_date && (
                                        <p className="text-sm text-red-500">{errors.visit_date}</p>
                                    )}
                                </div>

                                {/* Type of Visit */}
                                <div className="space-y-2">
                                    <Label htmlFor="type_of_visit" className="flex items-center gap-2">
                                        <Stethoscope className="h-4 w-4" />
                                        Type of Visit
                                    </Label>
                                    <Select
                                        value={data.type_of_visit}
                                        onValueChange={(value) => setData('type_of_visit', value)}
                                    >
                                        <SelectTrigger className={errors.type_of_visit ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select visit type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {visitTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.type_of_visit && (
                                        <p className="text-sm text-red-500">{errors.type_of_visit}</p>
                                    )}
                                </div>

                                {/* Veterinarian Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="vet_name" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Veterinarian Name
                                    </Label>
                                    <Input
                                        id="vet_name"
                                        type="text"
                                        placeholder="Dr. Smith"
                                        value={data.vet_name}
                                        onChange={(e) => setData('vet_name', e.target.value)}
                                        className={errors.vet_name ? 'border-red-500' : ''}
                                    />
                                    {errors.vet_name && (
                                        <p className="text-sm text-red-500">{errors.vet_name}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe the visit, treatment, or any important notes..."
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? 'border-red-500' : ''}
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Adding...' : 'Add Record'}
                                    </Button>
                                    <Button type="button" variant="outline" asChild>
                                        <Link href={index({ pet: pet.id }).url}>
                                            Cancel
                                        </Link>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
