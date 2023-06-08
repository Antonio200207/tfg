<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sede;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class SedeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($empresa)
    {
        $sedes = Sede::where('empresa',$empresa)->get();
       
        if (!$sedes)
        {
            return response()->json([
                'mensaje' => 'Sede no encontrado.'
            ], 404);
        }
        return response()->json([
            'data' => $sedes
        ], Response::HTTP_OK);
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
        // Creamos el artículo en la BD
        $data = $request->only('nombre', 'direccion','empresa');

        $validator = Validator::make($data, [
            'nombre' => 'required|string|min:2|max:200',
            'direccion' => 'required|string|min:2|max:200',
            'empresa' => 'required|string|max:200',
        ]);

        // Si falla la validación devolvemos los errores
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        $articulo = Sede::create([
            'nombre' => $data["nombre"],
            'direccion' => $data["direccion"],
            'empresa' => $data["empresa"]
        ]);
    
        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'mensaje' => 'Artículo creado',
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
    public function destroy($id)
    {
        $em = Sede::where('id',$id);
        
        // Si no tenemos artículo mandado el mensaje correspondiente
        if (!$em)
        {
            return response()->json([
                'mensaje' => 'sede no encontrado.'
            ], 404);
            
        }
        // Eliminamos el artículo
        $em->delete();
        // Devolvemos la respuesta
        return response()->json([
            'mensaje' => 'sede borrado correctamente'
        ], Response::HTTP_OK);
    }

}
