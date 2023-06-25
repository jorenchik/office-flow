<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;

class LocaleController extends BaseController
{
    public function setLocale(Request $request)
    {
        $data = $request->validate([
            'locale' => 'in:lv,en'
        ]);
        $locale = $data['locale'];
        App::setLocale($locale);
        Cookie::queue(Cookie::make('locale', $locale, 0));
        return back();
    }
}