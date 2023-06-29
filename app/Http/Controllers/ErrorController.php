<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ErrorController extends Controller
{
    public static function renderError($code)
    {
        $errorMessages = [
            '400' => 'Bad Request',
            '401' => 'Unauthorized',
            '403' => 'Forbidden',
            '404' => 'Not Found',
            '405' => 'Method Not Allowed',
            '408' => 'Request Timeout',
            '500' => 'Internal Server Error',
            '502' => 'Bad Gateway',
            '503' => 'Service Unavailable',
            '504' => 'Gateway Timeout',
        ];

        if (array_key_exists($code, $errorMessages)) {
            return Inertia::render('Error', [
                'errorCode' => $code,
                'error' => $errorMessages[$code],
            ]);
        } else {
            return Inertia::render('Error', [
                'errorCode' => '500',
                'error' => 'Internal Server Error',
            ]);
        }
    }
}