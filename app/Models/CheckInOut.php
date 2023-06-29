<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckInOut extends Model
{
    use HasFactory;

    protected $fillable = [
        'registered_at',
        'employee_id',
        'type_id',
        'workplace_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];


    public function workplace()
    {
        return $this->belongsTo(Workplace::class);
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function checkInOutType()
    {
        return $this->belongsTo(CheckInOutType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}