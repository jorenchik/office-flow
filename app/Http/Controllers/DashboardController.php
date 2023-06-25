<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends BaseController
{
    public function show() {
        $localeEntries = $this->prepareLocalizationEntries(['pagination', 'navbar', 'languages', 'header', 'dashboard']);
        return Inertia::render('Dashboard', [
            'localeEntries' => $localeEntries
        ]);
    }
}
