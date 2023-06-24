<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'rating',
        'visit_application_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function visitApplication()
    {
        return $this->belongsTo(VisitApplication::class);
    }
}