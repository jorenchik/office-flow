<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workplace extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function checksInsOut()
    {
        return $this->hasMany(CheckInOut::class);
    }
}