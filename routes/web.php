<?php

use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckinController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StaticPageController;
use App\Http\Controllers\ErrorController;
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

Route::redirect('/', '/appointments');

Route::middleware(['protect'])->group(function () {

    Route::get('/about', [StaticPageController::class, 'about'])->name('about');

    Route::get('/contacts', [StaticPageController::class, 'contacts'])->name('contacts');

    Route::get('/help', [StaticPageController::class, 'help'])->name('help');
    
    Route::get('/account', [ProfileController::class, 'show'])->name('account');

        Route::get('/checkin', [CheckinController::class, 'index'])->name('checkin.index');

        Route::get('/checkin/register', [CheckinController::class, 'register'])->name('checkin.register');

        Route::post('/checkin/store', [CheckinController::class, 'store'])->name('checkin.store');

        Route::post('/checkin/edit/{id}', [CheckinController::class, 'edit'])->name('checkin.edit');

        Route::post('/checkin/store/employee', [CheckinController::class, 'storeEmployee'])->name('checkin.storeEmployee');

        Route::get('/checkin/edit/{id}', [CheckinController::class, 'edit'])->name('checkins.edit');

        Route::get('/checkin/view/{id}', [CheckinController::class, 'view'])->name('checkin.view');

        Route::post('/checkin/delete', [CheckinController::class, 'delete'])->name('checkin.delete');

    Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard');

        Route::get('/appointments', [AppointmentsController::class, 'index'])->name('appointments.index');

        Route::get('/appointments/apply', [AppointmentsController::class, 'apply'])->name('appointments.apply');

        Route::post('/appointments/store', [AppointmentsController::class, 'store'])->name('appointments.store');

        Route::get('/appointments/edit/{id}', [AppointmentsController::class, 'edit'])->name('appointments.edit');

        Route::get('/appointments/view/{id}', [AppointmentsController::class, 'view'])->name('appointments.view');

        Route::post('/appointments/cancel', [AppointmentsController::class, 'cancel'])->name('appointments.cancel');

        Route::post('/appointments/delete', [AppointmentsController::class, 'delete'])->name('appointments.delete');

        Route::post('/appointments/confirm', [AppointmentsController::class, 'confirm'])->name('appointments.confirm');

        Route::put('/appointments/update', [AppointmentsController::class, 'update'])->name('appointments.update');

        Route::get('/offices', [OfficeController::class, 'index'])->name('offices.index');

        Route::get('/offices/view/{id}', [OfficeController::class, 'view'])->name('offices.view');

        Route::get('/offices/edit/{id}', [OfficeController::class, 'edit'])->name('offices.edit');

        Route::post('/offices/delete', [OfficeController::class, 'delete'])->name('offices.delete');

        Route::get('/offices/create', [OfficeController::class, 'create'])->name('offices.create');

        Route::put('/offices/store', [OfficeController::class, 'store'])->name('offices.store');

        Route::put('/offices/update', [OfficeController::class, 'update'])->name('offices.update');


    Route::post('logout', [AuthController::class, 'logout']) ->name('logout');

        Route::get('/error/{code}', [ErrorController::class, 'renderError'])->name('error');
    
});

Route::middleware(['guest'])->group(function () {

    Route::get('/login', [RegisteredUserController::class, 'login'])->name('login');


    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');

    Route::post('login', [AuthController::class, 'login'])
        ->name('user.login');

    Route::post('register', [RegisteredUserController::class, 'store'])
        ->name('user.register');
});

Route::post('/setlocale', [LocaleController::class, 'setLocale'])->name('locale.set');