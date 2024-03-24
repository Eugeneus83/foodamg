<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Validator;
use \Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = request(['email','password']);
        $rules = [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ];

        $validator = Validator::make($credentials, $rules);

        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        }

        if (Auth::attempt($credentials)) {
            $user = $request->user();
        }else {
            $user = User::create([
                'email' => $credentials['email'],
                'name' => 'Test user',
                'password' => Hash::make($credentials['password'])
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
