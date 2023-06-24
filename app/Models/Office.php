<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    use HasFactory;

    protected $fillable = [
        'presenting_ability',
        'capacity',
        'employee_using_possibility',
        'workplace_count',
        'department_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function workplaces()
    {
        return $this->hasMany(Workplace::class);

    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}