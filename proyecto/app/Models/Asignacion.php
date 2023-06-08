<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asignacion extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'dni_alumno',
        'nom_empresa',
        'estado',
        'sede'
    ];
    public function alumno(){
        return $this->hasOne(Alumno::class);
    }
    
    public function empresa(){
        return $this->hasOne(Empresa::class);
    }
}
