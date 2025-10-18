<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PetRecord extends Model
{
    protected $fillable = ['pet_id', 'visit_date', 'type_of_visit', 'description', 'vet_name'];

    public function pet(): BelongsTo
    {
        return $this->belongsTo(Pet::class, 'pet_id');
    }
}
