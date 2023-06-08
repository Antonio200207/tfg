<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    protected $fillable = [
        'dni',
        'nombre',
        'apellido'
    ];
    public $timestamps = false;
    public function curriculum(){
        return $this->hasOne(Curriculum::class);
    }
    
    public function asignacion(){
        return $this->hasOne(Asignacion::class);
    }
    
    public function user(){
        return $this->hasOne(User::class);
    }
}
