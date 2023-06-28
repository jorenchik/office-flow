<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\AvailableTime;
use App\Models\CheckInOut;
use App\Models\CheckInOutType;
use App\Models\Department;
use App\Models\Office;
use App\Models\UserPosition;
use App\Models\Position;
use App\Models\User;
use App\Models\VisitApplication;
use App\Models\VisitApplicationStatus;
use App\Models\VisitReview;
use App\Models\Workplace;
use Illuminate\Console\Command;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Database\Seeder;
use Faker\Factory;
use Carbon\Carbon;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Factory::create();

        // Application statuses
        $statuses = [
            'pending',
            'accepted',
            'completed',
            'rejected',
            'canceled',
            'on_hold',
            'draft',
            'faulty'
        ];

        // Department job positions
        $jobPositions = [
            "Software Development" => [
                "Software Developer",
                "Software Engineer",
                "Senior Software Developer",
                "Backend Developer",
                "Frontend Developer",
                "Full Stack Developer",
                "Database Developer"
            ],
            "Network Administration" => [
                "Network Administrator",
                "Network Engineer",
                "Senior Network Engineer",
                "Network Security Specialist",
                "Network Technician"
            ],
            "Data Analytics" => [
                "Data Analyst",
                "Senior Data Analyst",
                "Data Scientist",
                "Data Engineer"
            ],
            "Quality Assurance" => [
                "QA Tester",
                "QA Analyst",
                "Senior QA Analyst",
                "QA Engineer"
            ],
            "Project Management" => [
                "Project Manager",
                "Senior Project Manager",
                "Program Manager",
                "Project Coordinator"
            ],
            "UI/UX Design" => [
                "UI Designer",
                "UX Designer",
                "Senior UI/UX Designer",
                "UX Researcher"
            ],
            "IT Support" => [
                "IT Support Specialist",
                "IT Support Technician",
                "IT Support Analyst",
                "Helpdesk Technician"
            ],
            "Cybersecurity" => [
                "Cybersecurity Analyst",
                "Cybersecurity Engineer",
                "Cybersecurity Consultant",
                "Information Security Specialist"
            ],
            "Research and Development" => [
                "R&D Engineer",
                "Senior R&D Engineer",
                "Research Scientist",
                "Product Development Manager"
            ],
            "Cloud Computing" => [
                "Cloud Architect",
                "Cloud Consultant",
                "Cloud Systems Engineer",
                "Cloud Support Specialist"
            ]
        ];

        // Departments
        $departmentNames = array_keys($jobPositions);
        $departments = [];
        for ($i = 0; $i < 4; ++$i) {
            $department = Department::create([
                'name' => $departmentNames[$i],
            ]);
            // Offices
            $departments[] = $department;
        }

        $floorCount = 4;
        $usedDepartments = [];
        for ($i = 0; $i < $floorCount; ++$i) {
            $officeCount = $faker->numberBetween(3, 6);
            for ($k = 0; $k < $officeCount; ++$k) {
                $office = Office::make([
                    'id' => ($i + 1) * 100 + $k,
                    'presenting_ability' => $faker->boolean(),
                    'employee_using_possibility' => $faker->boolean(),
                ]);
                $department = $departments[$i];
                $office->department()->associate($department);
                ;
                if (!in_array($department, $usedDepartments)) {
                    $usedDepartments[] = $department;
                }

                // Workplaces
                $workplaces = [];
                $workplaceCount = $faker->numberBetween(8, 12);
                for ($l = 0; $l < $workplaceCount; ++$l) {
                    $workplace = Workplace::make([
                        'id' => $l + 1,
                    ]);
                    $workplace->office()->associate($office);
                    $workplaces[] = $workplace;
                }

                $office->workplace_count = count($workplaces);
                $office->capacity = $office->workplace_count + $faker->numberBetween(0, 4);
                $office->save();
                foreach ($workplaces as $workplace) {
                    $workplace->save();
                }
            }
        }

        // Department job positions
        $availableDepartments = [];
        foreach ($jobPositions as $departmentName => $jobPositionNames) {
            $departments = Department::where('name', $departmentName)->get();
            if (count($departments) >= 1) {
                foreach ($jobPositionNames as $jobPositionName) {
                    $jobPosition = Position::make([
                        'name' => $jobPositionName
                    ]);
                    $department = $departments[0];
                    $jobPosition->department()->associate($department);
                    if (!in_array($department, $availableDepartments)) {
                        $availableDepartments[] = $department;
                    }
                    $jobPosition->save();
                }
            }
        }

        $userRole = Role::create(['name' => 'user']);
        $employeeRole = Role::create(['name' => 'employee']);
        $adminRole = Role::create(['name' => 'admin']);

        // All
        Permission::create(['name' => 'view my profile']);
        Permission::create(['name' => 'edit my profile']); 
        
       

        // Visitor and employee
        Permission::create(['name' => 'view my visits']);
        Permission::create(['name' => 'cancel my visit']);

        // Visitor privileges
        Permission::create(['name' => 'apply for visit']);
        Permission::create(['name' => 'create review']);
        Permission::create(['name' => 'edit review']);
        Permission::create(['name' => 'delete review']);

        // Employee privileges
        Permission::create(['name' => 'view dashboard']);
        Permission::create(['name' => 'view offices']);
        Permission::create(['name' => 'view check ins']);
        Permission::create(['name' => 'check in']);
        Permission::create(['name' => 'cancel visit']);
        Permission::create(['name' => 'delete check in']);
        Permission::create(['name' => 'confirm visit']);

        // Admin privileges
		Permission::create(['name' => 'view all visits']);
        Permission::create(['name' => 'view all offices']);
        Permission::create(['name' => 'view all check ins']);
        Permission::create(['name' => 'view all profiles']);
        Permission::create(['name' => 'view all reviews']);
		Permission::create(['name' => 'edit all visits']);
        Permission::create(['name' => 'edit all offices']);
        Permission::create(['name' => 'edit all check ins']);
        Permission::create(['name' => 'edit all profiles']);
        Permission::create(['name' => 'edit all reviews']);
		Permission::create(['name' => 'delete all visits']);
        Permission::create(['name' => 'delete all offices']);
        Permission::create(['name' => 'delete all check ins']);
        Permission::create(['name' => 'delete all profiles']);
        Permission::create(['name' => 'delete all reviews']);
        
        $userRole->givePermissionTo('view my profile');
        $userRole->givePermissionTo('edit my profile');
        $userRole->givePermissionTo('view my visits');
        $userRole->givePermissionTo('cancel my visit');
        $userRole->givePermissionTo('apply for visit');
        $userRole->givePermissionTo('create review');
        $userRole->givePermissionTo('edit review');
        $userRole->givePermissionTo('delete review');


        $adminRole->givePermissionTo('view my profile');
        $adminRole->givePermissionTo('edit my profile');
        $adminRole->givePermissionTo('edit my profile');
        $adminRole->givePermissionTo('view all visits');
        $adminRole->givePermissionTo('view all offices');
        $adminRole->givePermissionTo('view all check ins');
        $adminRole->givePermissionTo('view all profiles');
        $adminRole->givePermissionTo('view all reviews');
        $adminRole->givePermissionTo('edit all visits');
        $adminRole->givePermissionTo('edit all offices');
        $adminRole->givePermissionTo('edit all check ins');
        $adminRole->givePermissionTo('edit all profiles');
        $adminRole->givePermissionTo('edit all reviews');
        $adminRole->givePermissionTo('delete all visits');
        $adminRole->givePermissionTo('delete all offices');
        $adminRole->givePermissionTo('delete all check ins');
        $adminRole->givePermissionTo('delete all profiles');
        $adminRole->givePermissionTo('delete all reviews');

        $employeeRole->givePermissionTo('view my profile');
        $employeeRole->givePermissionTo('edit my profile');
        $employeeRole->givePermissionTo('view my visits');
        $employeeRole->givePermissionTo('view dashboard');
        $employeeRole->givePermissionTo('view offices');
        $employeeRole->givePermissionTo('view check ins');
        $employeeRole->givePermissionTo('check in');
        $employeeRole->givePermissionTo('cancel my visit');
        $employeeRole->givePermissionTo('delete check in');
        $employeeRole->givePermissionTo('confirm visit');

        // Users 
        $users = User::factory()->count(env('USER_SEED_COUNT'))->create();
        $admins = User::factory()->count(env('ADMIN_SEED_COUNT'))->create();
        $employees = User::factory()->count(env('EMPLOYEE_SEED_COUNT'))->create();
        foreach ($users as $user) {
            $user->assignRole($userRole);
            $user->save();
        }
        foreach ($admins as $user) {
            $user->assignRole($adminRole);
            $user->save();
        }
        foreach ($employees as $user) {
            $department = $faker->randomElement($availableDepartments);
            $user->department()->associate($department);
            $positionsAvailable = $department->positions()->get();
            $randomAvailablePosition = $faker->randomElement($positionsAvailable);
            $user->save();
            $userPosition = UserPosition::make();
            $userPosition->user()->associate($user);
            $userPosition->position()->associate($randomAvailablePosition);
            $user->assignRole($employeeRole);
            $userPosition->save();
        }

        // Head of department 
        foreach ($usedDepartments as $department) {
            $head = $faker->randomElement($users);
            $department->head()->associate($head);
            $department->save();
        }

        // Check in / out
        $checkInOutTypeNames = [
            'Start',
            'End',
            'Start from break',
            'End for a break',
            'End due to health condition',
            'End on instruction',
            'Faulty'
        ];

        foreach ($checkInOutTypeNames as $key => $typeName) {
            CheckInOutType::create([
                'id' => $key + 1,
                'name' => $typeName,
            ]);
        }

        $checkInOutTimeStart = 7;
        $checkInOutTimeEnd = 20;
        foreach ($employees as $user) {

            for ($i = 0; $i < 3; ++$i) {
                for ($k = 0; $k < 5; ++$k) {
                    // Randomize the check in/out days
                    if ($faker->boolean(75)) {
                        $randomStartingAt = $this->genarateRandomWeekdayDatetime($faker, $i, $k, $checkInOutTimeStart, $checkInOutTimeEnd, Carbon::minValue());
                        $checkOutTimeStart = intval($randomStartingAt->format('H'));
                        $randomEndingAt = $this->genarateRandomWeekdayDatetime($faker, $i, $k, $checkOutTimeStart, $checkInOutTimeEnd, $randomStartingAt);

                        $userDepartmentOffices = $user->department()->get()->first()->offices()->get();
                        $office = $userDepartmentOffices->random();
                        $workplaces = $office->workplaces()->get();
                        $workplace = $workplaces->random();
                        $checkIn = CheckInOut::make([
                            'registered_at' => $randomStartingAt,
                            'type_id' => CheckInOutType::where('name', 'Start')->first()->id,
                        ]);
                        $checkIn->workplace()->associate($workplace);
                        $checkIn->user()->associate($user);
                        $checkIn->save();
                    }
                }
            }
        }


        // Available times
        $availableTimeStartHours = 8;
        $availableTimeEndHours = 19;
        foreach ($employees as $user) {
            // TODO: Add employee logic
            for ($i = 0; $i < 3; ++$i) {
                for ($k = 0; $k < 5; ++$k) {
                    // Randomize the available time days
                    if ($faker->boolean(70)) {
                        $randomStartingAt = $this->genarateRandomWeekdayDatetime($faker, $i, $k, $availableTimeStartHours, $availableTimeEndHours, Carbon::minValue());
                        $endingHoursStart = intval($randomStartingAt->format('H'));
                        $randomEndingAt = $this->genarateRandomWeekdayDatetime($faker, $i, $k, $endingHoursStart, $availableTimeEndHours, $randomStartingAt);

                        $availableTime = AvailableTime::make([
                            'starting_at' => $randomStartingAt->format('Y-m-d H:i:s'),
                            'ending_at' => $randomEndingAt->format('Y-m-d H:i:s'),
                        ]);
                        $availableTime->user()->associate($user);
                        $availableTime->save();
                    }
                }
            }
        }


        $appointmentPurposes = [
            "Project Discussion",
            "Software Installation",
            "Network Setup and Troubleshooting",
            "System Upgrade",
            "Cybersecurity Review",
            "Data Migration",
            "Training on New Software",
            "Hardware Repair and Maintenance",
            "Software Bug Fixing",
            "Server Maintenance",
            "Performance Testing",
            "IT Consultation",
            "Software Demonstration",
            "Data Analysis",
            "Business Process Automation Discussion",
            "Cloud Services Setup",
            "Database Management",
            "Technical Support",
            "Product Development Meeting",
            "System Integration Discussion",
        ];

        $reviewTexts = array(
            1 => array(
                "I'm very disappointed with the service.",
                "The service quality was below my expectations.",
                "I had a poor experience with the team.",
                "The resolution of my problem took too long.",
                "I won't recommend their service to anyone.",
            ),
            2 => array(
                "I had a below-average experience.",
                "The service quality could have been better.",
                "The team could have been more responsive.",
                "The resolution of my problem could have been quicker.",
                "I probably won't use their service again.",
            ),
            3 => array(
                "The service was average.",
                "The team was moderately responsive.",
                "The resolution of my problem was satisfactory.",
                "I might consider using their service again.",
                "Their service was neither good nor bad.",
            ),
            4 => array(
                "I'm satisfied with the service I received.",
                "The team was responsive and helpful.",
                "My problem was resolved in a timely manner.",
                "I would recommend their service.",
                "I had a good experience with the team.",
            ),
            5 => array(
                "I'm extremely satisfied with the service.",
                "The team went above and beyond to help me.",
                "My problem was resolved in no time.",
                "I will definitely recommend their service.",
                "I had an excellent experience with the team.",
            ),
        );

        $visitApplicationStatuses = [];
        foreach ($statuses as $status) {
            $visitApplicationStatuses[] = VisitApplicationStatus::create([
                'name' => $status
            ]);
        }

        foreach ($employees as $employee) {
            $availableTimes = $employee->availableTimes()->get();
            foreach ($availableTimes as $availableTime) {
                // 35% chance that an appointment will be on a particular available time period
                if ($faker->boolean(45)) {
                    $start = Carbon::createFromFormat('Y-m-d H:i:s', $availableTime->starting_at)->addMinutes($faker->numberBetween(30, 120));
                    $end = $start->copy()->addMinutes($faker->numberBetween(60, 90));
                    $purpose = $faker->randomElement($appointmentPurposes);
                    $visitApplication = VisitApplication::make([
                        'starting_at' => $start->format('Y-m-d H:i:s'),
                        'ending_at' => $end->format('Y-m-d H:i:s'),
                        'purpose' => $purpose
                    ]);

                    $status = $faker->randomElement($visitApplicationStatuses);
                    $visitApplication->status()->associate($status);

                    $visitor = $faker->randomElement($users);
                    $visitApplication->visitor()->associate($visitor);
                    $visitApplication->employee()->associate($employee);
                    $visitApplication->save();
                    if ($faker->boolean(60)) {
                        $grade = $faker->numberBetween(1, 5);
                        $reviewText = $faker->randomElement($reviewTexts[$grade]);
                        $visitReview = VisitReview::make([
                            'text' => $reviewText,
                            'rating' => $grade
                        ]);
                        $visitReview->visitApplication()->associate($visitApplication);
                        $visitReview->save();
                    }
                }
            }
        }

    }

    public function getFirstMondayPastNow()
    {
        $firstMonday = Carbon::now();
        while ($firstMonday->dayOfWeek !== Carbon::MONDAY) {
            $firstMonday->subDay();
        }
        $firstMonday->startOfDay()->setTime(0, 0, 0);
        return $firstMonday;
    }

    public function genarateRandomWeekdayDatetime($faker, $weekOffset, $dayOffset, $startingHours, $endingHours, $minDatetime)
    {
        $firstMonday = $this->getFirstMondayPastNow();
        $date = $firstMonday->copy()->addWeeks($weekOffset);
        $date->addDays($dayOffset);
        $startDate = $date->copy()->addHours($startingHours);
        $endDate = $date->copy()->addHours($endingHours);

        $randomDatetime = $faker->dateTimeBetween($startDate, $endDate);
        $minute = intval($randomDatetime->format('i'));
        $minute = floor($minute / 15) * 15;
        $randomDatetime->setTime($randomDatetime->format('H'), $minute, 0);

        $randomDatetime = Carbon::createFromFormat('Y-m-d H:i:s', $randomDatetime->format('Y-m-d H:i:s'));
        if ($randomDatetime >= $minDatetime) {
            $randomDatetime->addHours(1);
        }
        return $randomDatetime;
    }
}