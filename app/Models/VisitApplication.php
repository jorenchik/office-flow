<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use IntlDateFormatter;

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

    public function getStatusName()
    {
        return VisitApplicationStatus::get()->first()['name'];
    }

    public function getStartingDate()
    {
        $datetime = Carbon::parse($this['starting_at']);
        $formatter = new IntlDateFormatter('lv_LV', IntlDateFormatter::LONG, IntlDateFormatter::NONE);
        return $formatter->format($datetime);
    }
    public function getStartingTime()
    {
        $datetime = Carbon::parse($this['starting_at']);
        $formatter = new IntlDateFormatter('lv_LV', IntlDateFormatter::NONE, IntlDateFormatter::SHORT);
        return $formatter->format($datetime);
    }
    public function getEndingTime()
    {
        $datetime = Carbon::parse($this['ending_at']);
        $formatter = new IntlDateFormatter('lv_LV', IntlDateFormatter::NONE, IntlDateFormatter::SHORT);
        return $formatter->format($datetime);
    }

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