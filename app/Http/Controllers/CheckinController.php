<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckinController extends BaseController
{
    
    public function show() {
        $localeEntries = $this->prepareLocalizationEntries(['pagination', 'navbar', 'languages', 'header', 'checkins']);
        return Inertia::render('CheckIns', [
            'localeEntries' => $localeEntries
        ]);
    }
}
