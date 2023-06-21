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
|--------------------------------------------------------------------------
|
*/

Route::group(['middleware' => 'auth'], function () {

    Route::redirect('/', '/dashboard');

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

Route::group(['middleware' => 'noauth'], function () {

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