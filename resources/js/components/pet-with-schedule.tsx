import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, PawPrint, Plus, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { type Pet } from '@/types';
import { create } from '@/routes/pet-records';

interface PetWithScheduleProps {
    pets: Pet[];
}

export function PetWithSchedule({ pets }: PetWithScheduleProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const getNextSchedule = (pet: Pet) => {
        if (!pet.pet_records || pet.pet_records.length === 0) {
            return null;
        }
        
        // Get the most recent record
        const latestRecord = pet.pet_records[0];
        return latestRecord;
    };

    const getScheduleColor = (type: string) => {
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">My Pets</h2>
                    <p className="text-sm text-muted-foreground">
                        Recent pets and their schedules
                    </p>
                </div>
                <Button asChild>
                    <Link href="/pets">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Pet
                    </Link>
                </Button>
            </div>

            {/* Pets Grid */}
            {pets.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <PawPrint className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Pets Yet</h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Start by adding your first pet to track their health and schedules.
                        </p>
                        <Button asChild>
                            <Link href="/pets/create">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Pet
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pets.map((pet) => {
                        const nextSchedule = getNextSchedule(pet);
                        
                        return (
                            <Card key={pet.id} className="overflow-hidden">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-3">
                                        {/* Pet Avatar */}
                                        <div className="relative">
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
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                                                <span className="text-xs">
                                                    {pet.species === 'cat' ? '🐱' : '🐶'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Pet Info */}
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-lg truncate">
                                                {pet.name}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {pet.species} • {pet.breed}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="pt-0">
                                    {/* Schedule Section */}
                                    <div className="space-y-3">
                                        {nextSchedule ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    <span>Last Visit</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-sm">
                                                            {formatDate(nextSchedule.visit_date)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Dr. {nextSchedule.vet_name}
                                                        </p>
                                                    </div>
                                                    <Badge className={getScheduleColor(nextSchedule.type_of_visit)}>
                                                        {nextSchedule.type_of_visit}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                                <p className="text-sm text-muted-foreground">
                                                    No visits recorded yet
                                                </p>
                                            </div>
                                        )}
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-2">
                                            <Button variant="outline" size="sm" className="flex-1" asChild>
                                                <Link href={`/pets/${pet.id}`}>
                                                    View Details
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={create({ pet: pet.id }).url}>
                                                    <Plus className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
