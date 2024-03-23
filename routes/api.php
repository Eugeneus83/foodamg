<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
});

Route::post('/login', [AuthController::class, 'login']);

//Route::middleware('auth:api')->get('/user', function (Request $request) {
  //  return $request->user();
//});

///Route::get('/user', function (Request $request) {
  //  return $request->user();
//})->middleware(Authenticate::using('sanctum'));
