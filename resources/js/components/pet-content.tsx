import { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PetImage {
    id: string;
    url: string;
    width: number;
    height: number;
}

interface PetFactResponse {
    fact: string;
}

interface PetContentProps {
    species: 'cat' | 'dog';
    className?: string;
}

export function PetContent({ species, className }: PetContentProps) {
    const [image, setImage] = useState<PetImage | null>(null);
    const [fact, setFact] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPetData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Get API key from environment variables based on species
            const apiKey = species === 'cat' 
                ? import.meta.env.VITE_CAT_API_KEY 
                : import.meta.env.VITE_DOG_API_KEY;
            
            // Fetch image from API
            const imageResponse = await fetch(`https://api.the${species}api.com/v1/images/search?limit=1&api_key=${apiKey}`);

            if (!imageResponse.ok) {
                throw new Error('Failed to fetch pet image');
            }

            const imageData = await imageResponse.json();
            setImage(imageData[0]);

            // Use static facts for now (more reliable)
            const facts = {
                cat: [
                    "Cats have been domesticated for over 4,000 years!",
                    "A group of cats is called a 'clowder'.",
                    "Cats spend 70% of their lives sleeping.",
                    "A cat's purr can help heal bones and reduce pain.",
                    "Cats have a third eyelid called a nictitating membrane."
                ],
                dog: [
                    "Dogs have been man's best friend for over 15,000 years!",
                    "A dog's nose print is unique, like human fingerprints.",
                    "Dogs can learn over 100 words and gestures.",
                    "The Basenji is the only dog that can't bark.",
                    "Dogs have a sense of smell 40 times better than humans."
                ]
            };

            const randomFact = facts[species][Math.floor(Math.random() * facts[species].length)];
            setFact(randomFact);

        } catch (err) {
            setError('Failed to load pet content');
            console.error('Error fetching pet data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPetData();
    }, [species]);

    const handleRefresh = () => {
        fetchPetData();
    };

    if (loading) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Loading {species} content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <div className="text-center">
                    <p className="text-sm text-red-500 mb-2">{error}</p>
                    <Button onClick={handleRefresh} size="sm" variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Background Image */}
            {image && (
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${image.url})`,
                        filter: 'brightness(0.7)',
                    }}
                />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-4">
                <div className="text-white">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold capitalize">
                            {species === 'cat' ? '🐱' : '🐶'} {species} Fact
                        </h3>
                        <Button 
                            onClick={handleRefresh} 
                            size="sm" 
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-sm leading-relaxed">
                        {fact}
                    </p>
                </div>
            </div>
        </div>
    );
}
