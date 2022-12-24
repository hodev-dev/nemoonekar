<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/list_tickets', [TicketController::class, 'list_tickets']);
Route::middleware('auth:sanctum')->post('/list_ticket', [TicketController::class, 'list_ticket']);
Route::middleware('auth:sanctum')->post('/add_ticket', [TicketController::class, 'add_ticket']);
Route::middleware('auth:sanctum')->post('/edit_ticket', [TicketController::class, 'edit_ticket']);
Route::middleware('auth:sanctum')->post('/delete_ticket', [TicketController::class, 'delete_ticket']);
