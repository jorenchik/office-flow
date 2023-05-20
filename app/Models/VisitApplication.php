<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitApplication extends Model
{
    use HasFactory;
    protected $fillable = [
        'purpose',  
        'starting_at',
        'ending_at',
        'status_id',
        'employee_id',
        'visitor_id',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function status()
    {
        return $this->belongsTo(VisitApplicationStatus::class);
    }

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id'); 
    }

    public function visitor()
    {
        return $this->belongsTo(User::class, 'visitor_id');
    }

    public function visitReview()
    {
        return $this->hasOne(VisitReview::class);
    }

}
