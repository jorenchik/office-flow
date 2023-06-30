<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends BaseController
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $localeEntries = $this->prepareLocalizationEntries(['profile', 'navbar', 'languages', 'header', 'action']);
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'localeEntries' => $localeEntries 
        ]);
    }

    public function show() {
        $localeEntries = $this->prepareLocalizationEntries(['navbar', 'languages', 'header']);
        return Inertia::render('Account', [
            'localeEntries' => $localeEntries
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->input('id');
        $user = User::find($id);

        $validatedData = $request->validate([
            
            'name' => ['required', 'max:255'],
            'last_name' => ['required', 'max:255'],
            'phone_number' => ['required', 'max:8'],
            'work_phone_number' => ['nullable', 'max:8'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'image' => ['nullable', 'image'], 
        ]);

        $userData = ['id' => $id];
        foreach($validatedData as $key => $val){  
            if ($key == 'image')
                continue;
            $userData[$key] = $val;
        }

        $user->update($userData);

        if ($request->hasFile('image')) {
            $user->clearMediaCollection();
            $user->addMediaFromRequest('image')
                ->toMediaCollection();
        }

        return redirect()->route('profile.view')->with('message', 'profileUpdateSuccess');
    }

    public function updatePassword(Request $request)
    {
        // Validate the request data
        $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'confirmed', 'min:8'],
        ]);

        // Check if the current password matches the user's password
        if (!Hash::check($request->current_password, $request->user()->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided password does not match our records.'],
            ]);
        }

        // Update the user's password
        $request->user()->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        // Redirect back to the form with a success message
        return back()->with('message', 'passwordUpdateSuccess');
    }

    public function view(Request $request)
    {
        $user = auth()->user();
        $role = $user->roles()->get()->first();
        $image = $user->getFirstMediaUrl('default','preview');
        $localeEntries = $this->prepareLocalizationEntries(['action', 'profile', 'navbar', 'languages', 'header']);

        return Inertia::render('Profile/View', [
            'image' => $image,
            'role' => $role,
            'localeEntries' => $localeEntries
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}