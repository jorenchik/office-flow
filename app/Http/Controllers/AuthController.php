<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!$token = auth()->attempt($credentials)) {
            return back()->withErrors([
                'email' => 'Credentials are incorrect or user does not exist'
            ]);
        }

        if ($request['remember']) {
            $jwtCookie = Cookie::forever('jwt', $token, 5000);
        } else {
            $jwtCookie = Cookie::make('jwt', $token);
        }

        $user = Auth::user();
        auth()->setUser($user);

        return to_route('dashboard')->withCookies(['jwt' => $jwtCookie]);
    }


    public function logout(Request $request)
    {
        return to_route('dashboard')->withCookies([
            'jwt' => Cookie::forget('jwt')
        ]);
    }
}