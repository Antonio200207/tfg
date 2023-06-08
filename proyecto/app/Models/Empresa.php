<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'descripcion'
    ];
    public function asignacion(){
        return $this->hasOne(Asignacion::class);
    }
    
    public function sedes(){
        return $this->hasMany(Sede::class);
    }
}
