<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{   
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'ruta',
        'dni_alumno'
    ];
    public function alumno(){
        return $this->hasOne(Alumno::class);
    }
}
