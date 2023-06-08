<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Docente;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $request->only('dni', 'nombre','apellido');

        $validator = Validator::make($data, [
            'dni' => 'required|string|max:9',
            'nombre' => 'required|string|min:2',
            'apellido' => 'required|string|min:2'
        ]);

        // Si falla la validación devolvemos los errores
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        $articulo = Docente::create([
            'dni' => $data["dni"],
            'nombre' => $data["nombre"],
            'apellido' => $data["apellido"]
        ]);
    
        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'mensaje' => 'Docente creado',
            'data' => $articulo
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

}
