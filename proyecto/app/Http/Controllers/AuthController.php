<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;



class AuthController extends Controller
{

    // Función que utilizaremos para registrar al usuario
    public function register(Request $request)
    {
        // Indicamos que solo queremos recibir name, email y password de la request
        $data = $request->only('dni', 'tipo', 'password');

        //Realizamos las validaciones
        $validator = Validator::make($data, [
            'dni' => 'required|string|min:8|max:10',
            'tipo' => 'required|string',
            'password' => 'required|string|min:2|max:10',
        ]);

        // Devolvemos un error si fallan las validaciones
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        // Creamos el nuevo usuario si todo es correcto
        $user = User::create([
            'dni' => $request->dni,
            'tipo' => $request->tipo,
            'password' => $request->password
        ]);

        // Devolvemos la respuesta con los datos del usuario
        return response()->json([
            'exito' => true,
            'mensaje' => 'Usuario creado',
            'usuario' => $user
        ], Response::HTTP_OK);
    }

    // Funcion que utilizaremos para hacer login
    public function authenticate(Request $request)
    {
        // Indicamos que solo queremos recibir email y password de la request
        $credentials = $request->only('dni', 'password');
        
        // Validaciones
        $validator = Validator::make($credentials, [
            'dni' => 'required|string|max:10',
            'password' => 'required|string|min:6|max:50'
        ]);

        // Devolvemos un error de validación en caso de fallo en las verificaciones
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }
        
        $us = User::where('dni',$request->dni)->where('password',$request->password)->get();

        if (!$us) {
            return response()->json([
                'mensaje' => 'user no encontrado.'
            ], 404);
        }
        return response()->json([
            'data' => $us
        ], Response::HTTP_OK);

        // Intentamos hacer login
        
    }

    // Función que utilizaremos para eliminar el token y desconectar al usuario
    public function logout(Request $request)
    {
    
    }

    // Función que utilizaremos para obtener los datos del usuario.
    public function getUser(Request $request)
    {
        // Miramos si el usuario se puede autenticar con el token
        
    }
    public function destroy($dni)
    {
        // Buscamos el artículo
        $us = User::where('dni',$dni);
        
        // Si no tenemos artículo mandado el mensaje correspondiente
        if (!$us)
        {
            return response()->json([
                'mensaje' => 'user no encontrado.'
            ], 404);
            
        }
        // Eliminamos el artículo
        $us->delete();
        // Devolvemos la respuesta
        return response()->json([
            'mensaje' => 'user borrado correctamente'
        ], Response::HTTP_OK);
    }

}
