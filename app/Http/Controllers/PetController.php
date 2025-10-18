<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Enums\Species;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PetController extends Controller
{
    /**
     * Display a listing of the user's pets.
     */
    public function index(): Response
    {
        $pets = auth()->user()->pets()->latest()->get();
        
        return Inertia::render('pets', [
            'pets' => $pets,
            'species' => collect(Species::cases())->map(fn($species) => [
                'value' => $species->value,
                'label' => $species->label(),
            ])->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new pet.
     */
    public function create(): Response
    {
        return Inertia::render('pets/create', [
            'species' => collect(Species::cases())->map(fn($species) => [
                'value' => $species->value,
                'label' => $species->label(),
            ])->toArray(),
        ]);
    }

    /**
     * Store a newly created pet in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|in:' . implode(',', array_column(Species::cases(), 'value')),
            'breed' => 'required|string|max:255',
            'gender' => 'required|string|in:Male,Female',
            'age' => 'required|string|max:255',
            'weight' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,jfif',
        ]);

        $data = $request->all();
        
        // Debug file upload
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            \Log::info('Avatar file details:', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'extension' => $file->getClientOriginalExtension(),
            ]);
            $data['avatar'] = $file->store('pet-avatars', 'public');
        } else {
            \Log::info('No avatar file uploaded');
        }

        auth()->user()->pets()->create($data);

        return redirect()->route('pets.index')->with('success', 'Pet added successfully!');
    }

    /**
     * Display the specified pet.
     */
    public function show(Pet $pet): Response
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        // Load pet records with the pet
        $pet->load('petRecords');

        return Inertia::render('pets/show', [
            'pet' => $pet,
        ]);
    }

    /**
     * Show the form for editing the specified pet.
     */
    public function edit(Pet $pet): Response
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('pets/edit', [
            'pet' => $pet,
            'species' => collect(Species::cases())->map(fn($species) => [
                'value' => $species->value,
                'label' => $species->label(),
            ])->toArray(),
        ]);
    }

    /**
     * Update the specified pet in storage.
     */
    public function update(Request $request, Pet $pet): RedirectResponse
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|in:' . implode(',', array_column(Species::cases(), 'value')),
            'breed' => 'required|string|max:255',
            'gender' => 'required|string|in:Male,Female',
            'age' => 'required|string|max:255',
            'weight' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,jfif',
        ]);

        $data = $request->all();
        
        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($pet->avatar) {
                Storage::disk('public')->delete($pet->avatar);
            }
            
            // Debug file upload
            $file = $request->file('avatar');
            \Log::info('Avatar file details (update):', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'extension' => $file->getClientOriginalExtension(),
            ]);
            $data['avatar'] = $file->store('pet-avatars', 'public');
        }

        $pet->update($data);

        return redirect()->route('pets.index')->with('success', 'Pet updated successfully!');
    }

    /**
     * Remove the specified pet from storage.
     */
    public function destroy(Pet $pet): RedirectResponse
    {
        // Ensure the pet belongs to the authenticated user
        if ($pet->user_id !== auth()->id()) {
            abort(403);
        }

        // Delete avatar file if exists
        if ($pet->avatar) {
            Storage::disk('public')->delete($pet->avatar);
        }

        $pet->delete();

        return redirect()->route('pets.index')->with('success', 'Pet deleted successfully!');
    }
}
