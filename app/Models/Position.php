<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EmployeePosition;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function userPosition()
    {
        return $this->hasMany(UserPosition::class, 'position_id');
    }

    public function users()
    {
        return $this->userPositions->map->user;
    }

}