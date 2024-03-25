<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use \Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreUserRequest;

class AuthController extends Controller
{
    public function login(StoreUserRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $user = User::create([
                'email' => $request->email,
                'name' => 'Test user',
                'password' => Hash::make($request->password)
            ]);
        }
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

}
