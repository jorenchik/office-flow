<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\UserPosition;
use App\Models\Position;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


/**
 * User model.
 *
 * You must override the default factory attributes: role_id, department_id.
 *
 *  
 */
class User extends Authenticatable implements JWTSubject, HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, InteractsWithMedia; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'last_name',
        'email',
        'role_id',
        'password',
        'phone_number',
        'work_phone_number'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Manipulations::FIT_CROP, 300, 300)
            ->format('jpg')
            ->nonQueued();
    }


    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getTimeAtWork()
    {
        $today = Carbon::today();

        $startWorkTimes = CheckInOut::where('user_id', $this->id)
            ->whereDate('registered_at', $today)
            ->where('type_id', CheckInOutType::where('name', 'Start')->first()->id)
            ->orderBy('registered_at')
            ->get();

        $endWorkTimes = CheckInOut::where('user_id', $this->id)
            ->whereDate('registered_at', $today)
            ->where('type_id', CheckInOutType::where('name', 'End')->first()->id)
            ->orderBy('registered_at')
            ->get();

        $totalWorkTimeInSeconds = 0;

        foreach ($startWorkTimes as $i => $startWorkTime) {
            $startTime = Carbon::createFromFormat('Y-m-d H:i:s', $startWorkTime->registered_at);
            if (isset($endWorkTimes[$i])) {
                $endTime = Carbon::createFromFormat('Y-m-d H:i:s', $endWorkTimes[$i]->registered_at);
                $totalWorkTimeInSeconds += $startTime->diffInRealSeconds($endTime);
            } else {
                // If there's no corresponding end time for a start time, check if currently on break or not at work
                $latestActivity = CheckInOut::where('user_id', $this->id)
                    ->whereDate('registered_at', $today)
                    ->latest('registered_at')
                    ->first();
            
                $types = [];
                $type1 = CheckInOutType::where('name', 'End for a break')->first();
                if($type1)
                {
                    $types[] = $type1->id;
                }
                $type2 = CheckInOutType::where('name', 'End due to health condition')->first();
                if($type2)
                {
                    $types[] = $type2->id;
                }
                $type3 = CheckInOutType::where('name', 'End on instruction')->first();
                if($type3)
                {
                    $types[] = $type3->id;
                }
                if ($latestActivity && !in_array($latestActivity->type_id,$types) && 
                    $latestActivity->type_id != CheckInOutType::where('name', 'End')->first()->id) {
                    $totalWorkTimeInSeconds += $startTime->diffInSeconds(Carbon::now());
                }
            }
        }

        $totalBreakTime = $this->getTotalBreakTime($today);

        return $totalWorkTimeInSeconds - $totalBreakTime;
    }



    private function getTotalBreakTime($day)
    {
        $startBreakTimes = CheckInOut::where('user_id', $this->id)
            ->whereDate('registered_at', $day)
            ->where('type_id', CheckInOutType::where('name', 'End for a break')->first()->id)
            ->get();

        $totalBreakTime = 0;

        foreach ($startBreakTimes as $startBreakTime)
        {
            $endBreakTime = CheckInOut::where('user_id', $this->id)
                ->whereDate('registered_at', $day)
                ->where('type_id', CheckInOutType::where('name', 'Start from break')->first()->id)
                ->where('registered_at', '>', $startBreakTime->registered_at)
                ->first();

            if ($endBreakTime) {
                $endBreakTime = Carbon::createFromFormat('Y-m-d H:i:s', $endBreakTime->registered_at);
                $totalBreakTime += Carbon::createFromFormat('Y-m-d H:i:s', $startBreakTime->registered_at)->diffInRealMinutes($endBreakTime);
            }
        }

        return $totalBreakTime;
    }

    public function getLastStartCheckInToday() 
    {
        $lastCheckIn = CheckInOut::where('user_id', $this->id)
            ->where('type_id', 1)
            ->whereDate('registered_at', Carbon::today())
            ->orderBy('registered_at', 'desc')
            ->first();
        return $lastCheckIn ? $lastCheckIn : null;
    }

    public function getVisitsInCurrentMonth()
    {
        return VisitApplication::where('employee_id', $this->id)
            ->whereBetween('starting_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
            ->count();
    }

    public function getVisitsInCurrentWeek()
    {
        return VisitApplication::where('employee_id', $this->id)
            ->whereBetween('starting_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->count();
    }

    public function getCheckInsInCurrentMonth()
    {
        return CheckInOut::where('user_id', $this->id)
            ->whereBetween('registered_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
            ->count();
    }

    public function getCheckInsInCurrentWeek()
    {
        return CheckInOut::where('user_id', $this->id)
            ->whereBetween('registered_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->count();
    }

    public function getLastCheckIn()
    {
        return CheckInOut::where('user_id', $this->id)
            ->whereDate('registered_at', Carbon::today())
            ->latest('registered_at')
            ->first();
        
    }

    public function getAvailableCheckInTypes()
    {
        $lastCheckIn = $this->getLastCheckIn();
        $checkInTypes = [];
        if ($lastCheckIn) {
            switch ($lastCheckIn->type_id) {
                case CheckInOutType::where('name', 'Start')->first()->id:
                case CheckInOutType::where('name', 'Start from break')->first()->id:
                    $checkInTypes = ['End', 'End for a break', 'End due to health condition', 'End on instruction'];
                    break;
                case CheckInOutType::where('name', 'End for a break')->first()->id:
                    $checkInTypes = ['Start from break', 'End due to health condition', 'End on instruction'];
                    break;
                case CheckInOutType::where('name', 'End')->first()->id:
                case CheckInOutType::where('name', 'End on instruction')->first()->id:
                case CheckInOutType::where('name', 'End due to health condition')->first()->id:
                    $checkInTypes = ['Start'];
            }
        } else {
            $checkInTypes = ['Start'];
        }

        return $checkInTypes;
    }


    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function availableTimes()
    {
        return $this->hasMany(AvailableTime::class);
    }
    public function userPosition()
    {
        return $this->hasOne(UserPosition::class);
    }

    public function position()
    {
        return $this->userPosition()->get()->first()->position();
    }

    public function visitApplications()
    {
        return $this->hasMany(VisitApplication::class);
    }

    public function visits()
    {
        return $this->hasMany(VisitApplication::class);
    }
}