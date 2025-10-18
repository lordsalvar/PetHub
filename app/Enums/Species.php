<?php

namespace App\Enums;

enum Species: string
{
    case DOG = 'Dog';
    case CAT = 'Cat';
    case BIRD = 'Bird';
    case FISH = 'Fish';
    case REPTILE = 'Reptile';
    case OTHER = 'Other';

    public function label(): string
    {
        return match ($this) {
            self::DOG => 'Dog',
            self::CAT => 'Cat',
            self::BIRD => 'Bird',
            self::FISH => 'Fish',
            self::REPTILE => 'Reptile',
            self::OTHER => 'Other',
        };
    }
}
