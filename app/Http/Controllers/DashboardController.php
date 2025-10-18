<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with user's pets.
     */
    public function index(): Response
    {
        $pets = auth()->user()->pets()
            ->with(['petRecords' => function($query) {
                $query->latest('visit_date')->limit(1);
            }])
            ->latest()
            ->limit(3)
            ->get();

        return Inertia::render('dashboard', [
            'pets' => $pets,
        ]);
    }
}
