<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaticPageController extends BaseController
{
    public function about() {
        $localeEntries = $this->prepareLocalizationEntries(['navbar', 'languages', 'header', 'about']);
        return Inertia::render('About', [
            'localeEntries' => $localeEntries
        ]);
    }

    public function contacts() {
        $localeEntries = $this->prepareLocalizationEntries(['navbar', 'languages', 'header']);
        return Inertia::render('Contacts', [
            'localeEntries' => $localeEntries
        ]);
    }

    public function help() {
        $localeEntries = $this->prepareLocalizationEntries(['navbar', 'languages', 'header']);
        return Inertia::render('Help', [
            'localeEntries' => $localeEntries
        ]);
    }
}
