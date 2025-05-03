<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\CategoriaController;


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::prefix('produtos')->group(function () {
    Route::post('/', [ProdutoController::class, 'store']);
    Route::get('/', [ProdutoController::class, 'index']);
    Route::get('/{id}', [ProdutoController::class, 'show']);
    Route::put('/{id}', [ProdutoController::class, 'update']);
    Route::delete('/{id}', [ProdutoController::class, 'destroy']);
    Route::get('/paginado', [ProdutoController::class, 'paginated']);
    Route::get('/filtrado', [ProdutoController::class, 'filtered']);
});

Route::prefix('categorias')->group(function () {
    Route::post('/', [CategoriaController::class, 'store']);
    Route::get('/', [CategoriaController::class, 'index']);
    Route::get('/{id}', [CategoriaController::class, 'show']);
    Route::put('/{id}', [CategoriaController::class, 'update']);
    Route::delete('/{id}', [CategoriaController::class, 'destroy']);
});

