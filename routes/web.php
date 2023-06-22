<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

    Route::get('/appointments', function () {
        return Inertia::render('Appointments');
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