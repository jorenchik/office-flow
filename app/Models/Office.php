<?php

namespace App\Models;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Office extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

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

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Manipulations::FIT_CROP, 300, 300)
            ->format('jpg')
            ->nonQueued();
    }

    public function updateWorkplaces()
    {
        $workplaces = Workplace::where('office_id', $this->id)->get();
        $existingWorkplaceCount = $workplaces->count();
        $desiredWorkplaceCount = $this->workplace_count;
        if ($desiredWorkplaceCount < $existingWorkplaceCount) {
            // add 1 to desiredWorkplaceCount to delete workplaces and checkins that are greater than the desired count
            $workplacesToBeDeleted = $workplaces->slice($desiredWorkplaceCount);
            $workplacesToBeDeleted->each(function ($workplace) {
                DB::table('check_in_outs')
                    ->where('workplace_id', $workplace->id)
                    ->where('office_id', $this->id)
                    ->delete();

                DB::table('workplaces')
                    ->where('id', $workplace->id)
                    ->where('office_id', $this->id)
                    ->delete();
            });
        } elseif ($desiredWorkplaceCount > $existingWorkplaceCount) {
            for ($i = $existingWorkplaceCount + 1; $i <= $desiredWorkplaceCount; $i++) {
                $workplace = new Workplace();
                $workplace->office_id = $this->id;
                $workplace->save();
            }
        }
    }


    public function workplaces()
    {
        return $this->hasMany(Workplace::class);

    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}