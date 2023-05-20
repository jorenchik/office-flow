<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'head_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function positions()
    {
        return $this->hasMany(Position::class);
    }

    public function offices()
    {
        return $this->hasMany(Office::class);
    }

    public function head()
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
