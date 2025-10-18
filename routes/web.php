<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PetController;
use App\Http\Controllers\PetRecordController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('user', function () {
        return Inertia::render('user');
    })->name('user');
    
    Route::resource('pets', PetController::class);
    
    // Pet Records routes (nested under pets)
    Route::resource('pets.pet-records', PetRecordController::class)->except(['index'])->names([
        'create' => 'pet-records.create',
        'store' => 'pet-records.store',
        'show' => 'pet-records.show',
        'edit' => 'pet-records.edit',
        'update' => 'pet-records.update',
        'destroy' => 'pet-records.destroy',
    ]);
    
    // Custom route for pet records index
    Route::get('pets/{pet}/records', [PetRecordController::class, 'index'])->name('pet-records.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
