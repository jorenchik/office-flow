<?php

use App\Http\Controllers\OfficeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
	return view('index');
});


Route::get('department/{id}/offices', [OfficeController::class, 'indexByOffice']);
