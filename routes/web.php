<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
| Middleware from the 'web' group is applied automatically.
|--------------------------------------------------------------------------
|
*/

Route::redirect('/', '/dashboard');

Route::middleware(['protect'])->group(function () {

    Route::get('/about', function () {
        return Inertia::render('About');
    })->name('about');

    Route::get('/contacts', function () {
        return Inertia::render('Contacts');
    })->name('contacts');

    Route::get('/help', function () {
        return Inertia::render('Help');
    })->name('help');

    Route::get('/account', function () {
        return Inertia::render('Account');
    })->name('account');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/appointments', function (Request $request) {

        // Logic for conroller START
        $filters = [
            'time' => [
                'options' => ['all', 'past', 'future'],
                'choice' => 'all'
            ],
            'place' => [
                'options' => ['all', '1stbranch', '2ndbranch'],
                'choice' => 'all'
                ]
        ];

        // Place cannot be sorted in this instance 
        $sortEntries = ['name', 'email', 'date', 'time'];
        $choices = $request->validate([
            'time' => '',
            'place' => '',
            'sortAttribute' => '',
            // '' is representative of no sort
            'sortOrder' => 'in:,asc,desc'
        ]);

        $sort = null;
        if(array_key_exists('sortAttribute', $choices) && array_key_exists('sortOrder', $choices))
        {
            $sort = [
                'attribute' => $choices['sortAttribute'],
                'order' => $choices['sortOrder']
            ];
        } else
        {
            $sort = [
                'attribute' => '', 
                'order' => ''
            ];
        }

        foreach($filters as $attribute => $filter)
        {
            if(array_key_exists($attribute, $choices))
            {
                $filters[$attribute]['choice'] = $choices[$attribute];
            }
        }

        return Inertia::render('Appointments', [
            'filters' => $filters,
            'sort' => $sort,
            'sortEntries' => $sortEntries 
        ]);
        // Logic for conroller END

    })->name('appointments');

    Route::get('/checkins', function () {
        return Inertia::render('CheckIns');
    })->name('checkin');

    Route::get('/offices', function () {
        return Inertia::render('Offices');
    })->name('offices');

    Route::get('/reviews', function () {
        return Inertia::render('Reviews');
    })->name('reviews');

    Route::post('logout', [AuthController::class, 'logout'])
        ->name('logout');
});

Route::middleware(['guest'])->group(function () {

    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::post('login', [AuthController::class, 'login'])
        ->name('user.login');

    Route::post('register', [RegisteredUserController::class, 'store'])
        ->name('user.register');
});