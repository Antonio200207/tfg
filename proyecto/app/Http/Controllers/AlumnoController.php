<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Alumno;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class AlumnoController extends Controller
{
    protected $user;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $alumnos = Alumno::all();

        return response()->json([
            'data' => $alumnos
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

        $articulo = Alumno::create([
            'dni' => $data["dni"],
            'nombre' => $data["nombre"],
            'apellido' => $data["apellido"]
        ]);
    
        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'mensaje' => 'Alumno creado',
            'data' => $articulo
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $dni)
    {
        
         $alumno = Alumno::where('dni',$dni)->get();
       
         if (!$alumno)
         {
             return response()->json([
                 'mensaje' => 'Alumno no encontrado.'
             ], 404);
         }
         return response()->json([
             'data' => $alumno
         ], Response::HTTP_OK);
     } 

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Request $request, $dni)
    {
        //
        $data = $request->only('nombre', 'apellido');

        $validator = Validator::make($data, [
            'nombre' => 'required|string|min:3|max:200',
            'apellido' => 'required|min:6',
        ]);

        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }


        $em = Alumno::where('dni',$dni);

        // Actualizamos el artículo.
        $em->update([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido
        ]);
    
        // Devolvemos los datos actualizados.
        return response()->json([
            'mensaje' => 'Alumno actualizada correctamente',
            'data' => $em
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function edit(Request $request, $dni)
    {
        
        $alumno = Alumno::where('dni',$dni)->get();
       
        if (!$alumno)
        {
            return response()->json([
                'mensaje' => 'Alumno no encontrado.'
            ], 404);
        }

        $alumno->update([
            'cv' => $request->cv,
        ]);

        return response()->json([
            'mensaje' => 'Alumno actulizado.'
        ], Response::HTTP_OK);
    } 

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($dni)
    {
        // Buscamos el artículo
        $alumno = Alumno::where('dni',$dni);
        
        // Si no tenemos artículo mandado el mensaje correspondiente
        if (!$alumno)
        {
            return response()->json([
                'mensaje' => 'alumno no encontrado.'
            ], 404);
            
        }
        // Eliminamos el artículo
        $alumno->delete();
        // Devolvemos la respuesta
        return response()->json([
            'mensaje' => 'alumno borrado correctamente'
        ], Response::HTTP_OK);
    }
}
