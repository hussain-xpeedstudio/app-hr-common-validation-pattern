<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ValidationController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('home');

// Common Validation Pattern 
Route::get('/validation', [ValidationController::class, 'index']);
Route::post('/test_input', [ValidationController::class, 'storeTestInput'])->name('test_input');