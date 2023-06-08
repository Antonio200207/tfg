<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $empresas = Empresa::all();

        return response()->json([
            'data' => $empresas
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
        $data = $request->only('nombre', 'descripcion');

        $validator = Validator::make($data, [
            'nombre' => 'required|string|min:2|max:200',
            'descripcion' => 'required|min:1',
        ]);

        // Si falla la validación devolvemos los errores
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        $articulo = Empresa::create([
            'nombre' => $data["nombre"],
            'descripcion' => $data["descripcion"],
        ]);
    
        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'mensaje' => 'Empresa creada',
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

    public function update(Request $request, $nombre)
    {
        //

        $data = $request->only('descripcion');

        $validator = Validator::make($data, [
            'descripcion' => 'required|min:3',
        ]);

        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }


        $em = Empresa::where('Nombre',$nombre);

        // Actualizamos el artículo.
        $em->update([
            'descripcion' => $request->descripcion
        ]);
    
        // Devolvemos los datos actualizados.
        return response()->json([
            'mensaje' => 'Empresa actualizada correctamente',
            'data' => $em
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($nombre)
    {
        //
        $em = Empresa::where('Nombre',$nombre);
        
        // Si no tenemos artículo mandado el mensaje correspondiente
        if (!$em)
        {
            return response()->json([
                'mensaje' => 'empresa no encontrado.'
            ], 404);
            
        }
        // Eliminamos el artículo
        $em->delete();
        // Devolvemos la respuesta
        return response()->json([
            'mensaje' => 'empresa borrado correctamente'
        ], Response::HTTP_OK);
    }

}
