<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sede extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'direccion',
        'empresa',
    ];
    public function empresa()
    {
        return $this->belongs(Empresa::class);
    }
}
