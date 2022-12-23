<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'unique:users', 'email:rfc,dns'],
            'password' => ['required', 'min:6'],
            'repassword' => ['required', 'same:password']
        ], [
            'repassword.same' => 'رمز عبور با تکرار آن برابر نیست'
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return  response()->json([
            'user' => $user
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'password' => ['required', 'min:6'],
            'email' => ['required', 'min:6', 'email:rfc,dns'],
        ]);
        if (Auth::attempt($request->all())) {
            $request->session()->regenerate();
            return  response()->json([
                'user' => Auth::user()
            ], 200);
        }
        return  response()->json([
            'errors' => ['email' => ['نام کاربری یا کلمه عبور اشتباه است']]
        ], 422);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'user' => Auth::user()
        ], 200);
    }
}
