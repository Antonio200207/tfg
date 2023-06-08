<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asignacion;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class AsignacionController extends Controller
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
        $data = $request->only('dni_alumno','nom_empresa','estado','sede');
        
        $validator = Validator::make($data, [
            'dni_alumno' => 'required|string|min:8|max:9',
            'nom_empresa' => 'required|string|min:1|max:200',
            'estado' =>'required|string|min:8|max:30',
            'sede' => 'required|string|min:8|max:200'
        ]);

        // Si falla la validación devolvemos los errores
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        // Creamos el artículo en la BD
        
        
        $as = Asignacion::create([
            'dni_alumno' => $data["dni_alumno"],
            'nom_empresa' => $data["nom_empresa"],
            'estado' => $data["estado"],
            'sede' => $data["sede"]
        ]);
    
        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'mensaje' => 'Artículo creado',
            'data' => $as
        ], Response::HTTP_OK);


    }

    /**
     * Display the specified resource.
     */
    public function show($dni)
    {
        //
        $as = Asignacion::where('dni_alumno',$dni)->get();
       
        if (!$as)
        {
            return response()->json([
                'mensaje' => 'cv no encontrado.'
            ], 404);
        }
        return response()->json([
            'data' => $as
        ], Response::HTTP_OK);
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
