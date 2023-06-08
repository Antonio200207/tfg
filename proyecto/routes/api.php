<?php

use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\AsignacionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\SedeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [AuthController::class, 'authenticate']);

Route::post('register', [AuthController::class, 'register']);
//alumnos
Route::get('alumnos', [AlumnoController::class, 'index']);

Route::get('alumno/{dni}', [AlumnoController::class, 'show']);

Route::delete('alumno/{dni}', [AlumnoController::class, 'destroy']);

Route::delete('user/{dni}', [AuthController::class, 'destroy']);

Route::post('newAlumno', [AlumnoController::class, 'store']);

Route::post('newDocente', [DocenteController::class, 'store']);

Route::put('alumno/{dni}', [AlumnoController::class, 'update']);


//empresas
Route::get('empresas', [EmpresaController::class, 'index']);

Route::post('empresas', [EmpresaController::class, 'store']);

Route::delete('empresa/{id}', [EmpresaController::class, 'destroy']);

Route::put('empresa/{nombre}', [EmpresaController::class, 'update']);

//sedes
Route::get('sedes/{nombre}', [SedeController::class, 'index']);
Route::delete('sede/{id}', [SedeController::class, 'destroy']);


//sedes
Route::post('sedes', [SedeController::class, 'store']);

//curriculum
Route::get('cv/{dni}', [CurriculumController::class, 'show']);
Route::post('cv', [CurriculumController::class, 'store']);
Route::delete('cv/{id}', [CurriculumController::class, 'destroy']);
//asignacion
Route::post('asignacion', [AsignacionController::class, 'store']);

Route::get('asignacion/{dni}', [AsignacionController::class, 'show']);

Route::group(['middleware' => ['jwt.verify']], function() {
    //Todo lo que este dentro de este grupo requiere verificación de usuario.
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('user', [AuthController::class, 'getUser']);

});