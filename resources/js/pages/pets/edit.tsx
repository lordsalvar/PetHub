import PetForm from './create';

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
}

interface Species {
    value: string;
    label: string;
}

interface EditPetProps {
    pet: Pet;
    species: Species[];
}

export default function EditPet({ pet, species }: EditPetProps) {
    return <PetForm pet={pet} isEdit={true} species={species} />;
}
