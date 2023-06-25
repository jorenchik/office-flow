<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficeController extends BaseController
{
    public function show() {
        $localeEntries = $this->prepareLocalizationEntries(['pagination', 'navbar', 'languages', 'header', 'offices']);
        return Inertia::render('Offices', [
            'localeEntries' => $localeEntries
        ]);
    }
}
