<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Curriculum;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CurriculumController extends Controller
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
        $data = $request->only('nombre','ruta','dni_alumno');

        $validator = Validator::make($data, [
            'nombre' => 'required|string|max:200',
            'ruta' => 'required',
            'dni_alumno' => 'required|string|max:9'
        ]);

        // Si falla la validación devolvemos los errores
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        $cv = Curriculum::create([
            'nombre' => $data["nombre"],
            'ruta' => $data["ruta"],
            'dni_alumno' => $data["dni_alumno"]
        ]);
    
        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'mensaje' => 'CV creado',
            'data' => $cv
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function show($dni)
    {
        //
        $cv = Curriculum::where('dni_alumno',$dni)->get();
       
        if (!$cv)
        {
            return response()->json([
                'mensaje' => 'cv no encontrado.'
            ], 404);
        }
        return response()->json([
            'data' => $cv
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
    public function destroy($id)
    {
        //
        $cv = Curriculum::find($id);
        
        // Si no tenemos artículo mandado el mensaje correspondiente
        if (!$cv)
        {
            return response()->json([
                'mensaje' => 'cv no encontrado.'
            ], 404);
            
        }
        // Eliminamos el artículo
        $cv->delete();
        // Devolvemos la respuesta
        return response()->json([
            'mensaje' => 'cv borrado correctamente'
        ], Response::HTTP_OK);
    }

}
