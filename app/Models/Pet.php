<?php

namespace App\Models;

use App\Enums\Species;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pet extends Model
{
    protected $fillable = ['user_id', 'name', 'species', 'breed', 'gender', 'age', 'weight', 'color', 'notes', 'avatar'];

    protected function casts(): array
    {
        return [
            'species' => Species::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function petRecords(): HasMany
    {
        return $this->hasMany(PetRecord::class, 'pet_id');
    }
}
