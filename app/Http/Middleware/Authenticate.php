<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class Authenticate extends BaseMiddleware
{
    /* Authenticate the user using the jwt cookie.*/
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('jwt');

        if (!$token) {
            return to_route('login')->withcookies([
                'jwt' => cookie::forget('jwt')
            ]);
        }

        try {
            $user = JWTAuth::setToken($token)->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            // Add info about the reasons
            return to_route('login')->withcookies([
                'jwt' => cookie::forget('jwt')
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            // Add info about the reasons
            return to_route('login')->withcookies([
                'jwt' => cookie::forget('jwt')
            ]);
        } catch (\Exception $e) {
            return to_route('login')->withcookies([
                'jwt' => cookie::forget('jwt')
            ])->withErrors('Internal server error, try logging in again');
        }
        
        if (!$user) {
            return back()->withErrors(['email' => 'Provided credentials are not correct or user not found']);
        }
        
        // User as shared data
        auth()->setUser($user);

        return $next($request);
    }


    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }
}
