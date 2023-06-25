<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends BaseController
{
    //
    public function show() {
        $localeEntries = $this->prepareLocalizationEntries(['pagination', 'navbar', 'languages', 'header', 'reviews']);
        return Inertia::render('Reviews', [
            'localeEntries' => $localeEntries
        ]);
    }
}
