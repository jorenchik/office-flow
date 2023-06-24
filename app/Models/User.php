<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\UserPosition;
use App\Models\Position;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Spatie\Permission\Traits\HasRoles;


/**
 * User model.
 *
 * You must override the default factory attributes: role_id, department_id.
 *
 *  
 */
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
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

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
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
        return $this->employeePosition()->position;
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