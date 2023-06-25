<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BaseController extends Controller
{
    protected function prepareLocalizationEntries($keys)
    {
        $entries = [];
        foreach ($keys as $key) {
            $newTranslations = trans($key);
            if (is_array($newTranslations)) {
                $entries = array_merge($entries, $newTranslations);
            }
        }
        return $entries;
    }
}