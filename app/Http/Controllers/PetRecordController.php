<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\PetRecord;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PetRecordController extends Controller
{
    /**
     * Display a listing of pet records for a specific pet.
     */
    public function index(Pet $pet): Response
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        $petRecords = $pet->petRecords()->latest('visit_date')->get();
        
        return Inertia::render('pet-records/index', [
            'pet' => $pet,
            'petRecords' => $petRecords,
        ]);
    }

    /**
     * Show the form for creating a new pet record.
     */
    public function create(Pet $pet): Response
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('pet-records/create', [
            'pet' => $pet,
        ]);
    }

    /**
     * Store a newly created pet record in storage.
     */
    public function store(Request $request, Pet $pet): RedirectResponse
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'visit_date' => 'required|date',
            'type_of_visit' => 'required|string|max:255',
            'description' => 'required|string',
            'vet_name' => 'required|string|max:255',
        ]);

        $pet->petRecords()->create($request->all());

        return redirect()->route('pet-records.index', $pet)->with('success', 'Pet record added successfully!');
    }

    /**
     * Display the specified pet record.
     */
    public function show(Pet $pet, PetRecord $petRecord): Response
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        // Ensure the record belongs to the pet
        if ($petRecord->pet_id !== $pet->id) {
            abort(404);
        }

        return Inertia::render('pet-records/show', [
            'pet' => $pet,
            'petRecord' => $petRecord,
        ]);
    }

    /**
     * Show the form for editing the specified pet record.
     */
    public function edit(Pet $pet, PetRecord $petRecord): Response
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        // Ensure the record belongs to the pet
        if ($petRecord->pet_id !== $pet->id) {
            abort(404);
        }

        return Inertia::render('pet-records/edit', [
            'pet' => $pet,
            'petRecord' => $petRecord,
        ]);
    }

    /**
     * Update the specified pet record in storage.
     */
    public function update(Request $request, Pet $pet, PetRecord $petRecord): RedirectResponse
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        // Ensure the record belongs to the pet
        if ($petRecord->pet_id !== $pet->id) {
            abort(404);
        }

        $request->validate([
            'visit_date' => 'required|date',
            'type_of_visit' => 'required|string|max:255',
            'description' => 'required|string',
            'vet_name' => 'required|string|max:255',
        ]);

        $petRecord->update($request->all());

        return redirect()->route('pet-records.index', $pet)->with('success', 'Pet record updated successfully!');
    }

    /**
     * Remove the specified pet record from storage.
     */
    public function destroy(Pet $pet, PetRecord $petRecord): RedirectResponse
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        // Ensure the record belongs to the pet
        if ($petRecord->pet_id !== $pet->id) {
            abort(404);
        }

        $petRecord->delete();

        return redirect()->route('pet-records.index', $pet)->with('success', 'Pet record deleted successfully!');
    }
}
