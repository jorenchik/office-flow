<?php

namespace App\Http\Middleware;

use App\Http\Controllers\LocaleController;
use Closure;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;
use View;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->hasCookie('locale')) {
            $locale = $request->cookie('locale');
            App::setLocale($locale);
        } else {
            // TODO: Make it fallback locale
            $locale = 'en';
            Cookie::queue(Cookie::make('locale', $locale, 0));
            App::setLocale($locale);
        }

        Inertia::share('locale', $locale);
        return $next($request);
    }
}