<?php

namespace App\Http\Controllers;

use App\Models\AvailableTime;
use App\Models\User;
use App\Models\VisitApplication;
use App\Models\VisitApplicationStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentsController extends BaseController 
{
    protected $filters = [
        'starting_at' => [
            'options' => ['0' => 'all','1' => 'past', '2' => 'future'],
            'choice' => 'all',
        ],
        'status' => [
            'options' => [],
            'choice' => 'all',
        ],
    ];

    protected $activeNavbarElement = 'appointments';
    protected $baseRoute = 'appointments';
    protected $sort;
    protected $columns;


    public function __construct()
    {
        $statuses = DB::table('visit_application_statuses')->get();
        $this->filters['status']['options'] = ['all',...$statuses->mapWithKeys(function ($item) {
            return [$item->id => $item->name];
        })->toArray()];
    }

    public function delete(Request $request)
    {
        $user = auth()->user();
        $visitId = $request->id; // retrieve the visit id from the request

        if(!$visitId) {
            return redirect()->route('error', ['code' => '404']);
        }

        if(!$user->can('delete all visits')) {
            return redirect()->route('error', ['code' => '401']);
        }

        $visit = VisitApplication::findOrFail($visitId);

        // Add the visit time back to available times
        $employee = $visit->employee()->get()->first();

        if(!$employee) {
            return redirect()->route('error', ['code' => '404']);
        }

        $availableTime = AvailableTime::where('starting_at', '=', $visit['starting_at'])
                                        ->where('user_id', '=', $employee->id)
                                        ->get()
                                        ->first();

        if(!$availableTime)
        {
            AvailableTime::create([
                'user_id' => $visit->employee_id,
                'starting_at' => $visit->starting_at,
                'ending_at' => $visit->ending_at
            ]);
        }

        // Delete the visit reviews associated with the visit
        $visit->visitReview()->delete();

        // Delete the visit
        $visit->delete();

        return redirect()->route('appointments.index')->with(['message' => 'appointmentDeleteSuccess']);
    }

    public function cancel(Request $request)
    {
        $user = auth()->user();
        $visitId = $request->id; // retrieve the visit id from the request

        if(!$visitId) {
            return redirect()->route('error', ['code' => '404']);
        }

        $visit = VisitApplication::findOrFail($visitId);

        if($user->hasRole('employee')) {
            $employeeId = $visit['employee_id'];
            if($employeeId != $user['id']) {
                return redirect()->route('error', ['code' => '401']);
            }
        } else if ($user->hasRole('user')) {
            $visitorId = $visit['visitor_id'];
            if($visitorId != $user['id']) {
                return redirect()->route('error', ['code' => '401']);
            }
        } else if (!$user->hasRole('admin'))
        {
            return redirect()->route('error', ['code' => '401']);
        }

        $visit['status_id'] = 5;
        $visit->save();


        return redirect()->route('appointments.index')->with(['message' => 'appointmentCancelSuccess']);
    }


    public function confirm(Request $request)
    {
        $user = auth()->user();
        $visitId = $request->id; // retrieve the visit id from the request

        if(!$visitId) {
            return redirect()->route('error', ['code' => '404']);
        }

        $visit = VisitApplication::findOrFail($visitId);

        // Allow only employees to confirm the visit
        if(!$user->hasRole('employee')) {
            return redirect()->route('error', ['code' => '401']);
        }

        // The current user must be the employee assigned to the visit
        $employeeId = $visit['employee_id'];
        if($employeeId != $user['id']) {
            return redirect()->route('error', ['code' => '401']);
        }

        if($visit['status_id'] != 1) {
            return redirect()->route('error', ['code' => '400', 'message' => 'The visit is not in the pending state']);
        }

        $visit['status_id'] = 2;
        $visit->save();

        return redirect()->route('appointments.index')->with(['message' => 'appointmentConfirmSuccess']);
    }

    public function edit(Request $request, $visitId)
    {
        $localeEntries = $this->prepareLocalizationEntries(['appointments', 'pagination', 'navbar', 'languages', 'header', 'form']);

        // Retrieve the visit application
        $visit = VisitApplication::findOrFail($visitId);

        // Retrieve the employees
        $employees = User::role('employee')->get()->toArray();

        // Retrieve the available times of the employee assigned to this visit
        $availableTimes = AvailableTime::where('user_id', '=', $visit->employee_id)->get();

        // Assign keys to the available times for React
        $key = 0;
        foreach($availableTimes as &$time)
        {
            $time['key'] = $key;
            ++$key;
        }

        // Retrieve visit application statuses
        $statuses = VisitApplicationStatus::all();

        $actions = [
            'back' => [
                'route' => route('appointments.index'),
                'type' => 'secondary'
            ],
            'save' => [
                'route' => false,
                'type' => 'primary'
            ],
        ];

        return Inertia::render('Appointments/Edit', [
            'visit' => $visit, // pass the visit to the page
            'employees' => $employees,
            'chosenEmployeeId' => $visit->employee_id,
            'availableTimes' => $availableTimes,
            'statuses' => $statuses, // pass the visit application statuses to the page
            'localeEntries' => $localeEntries,
            'actions' => $actions
        ]);
    }


    public function apply(Request $request)
    {
        $localeEntries = $this->prepareLocalizationEntries(['appointments', 'pagination', 'navbar', 'languages', 'header', 'form']);

        $employees = User::role('employee')->get()->toArray();
        if($employeeId = $request->input('employee_id'))
        {
            $availableTimes = AvailableTime::where('user_id', '=', $employeeId)->get();
            $key = 0;
            foreach($availableTimes as &$time)
            {
                $time['key'] = $key;
                ++$key;
            }
        } else {
            $availableTimes = [];
        }
        
        $actions = [
            'back' => [
                'route' => route('appointments.index'),
                'type' => 'secondary'
            ],
            'save' => [
                'route' => false,
                'type' => 'primary'
            ],
        ];

        return Inertia::render('Appointments/Apply', [
            'employees' => $employees,
            'chosenEmployeeId' => $employeeId,
            'availableTimes' => $availableTimes,
            'localeEntries' => $localeEntries,
            'actions' => $actions
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if(!$user->can('apply for visit'))
        {
            return redirect()->route('error', ['code' => '401']);
        }

        $validated = $request->validate([
            'purpose' => 'required|max:255',
            'employee_id' => 'required|exists:users,id',
            'starting_at' => 'required|date',
        ]);

        $validated['visitor_id'] = $user->id;

        $employee = User::findOrFail($validated['employee_id']);

        // pending status
        $validated['status_id'] = 1; 

        $availableTime = AvailableTime::where('starting_at', '=', $validated['starting_at'])
                    ->where('user_id', '=', $employee->id)
                    ->get()
                    ->first();
        
        if(!$availableTime)
            return redirect()->route('error', ['code' => '404']);
            
        $validated['ending_at'] = $availableTime['ending_at'];

        DB::table('available_times')
            ->where('user_id', $availableTime['user_id'])
            ->where('starting_at', $availableTime['starting_at'])
            ->delete();

        VisitApplication::create($validated);
        return redirect()->route('appointments.index')->with('message', 'appointmentApplySuccess');
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        if(!$user->can('edit all visits'))
        {
            return redirect()->route('error', ['code' => '401']);
        }

        $validated = $request->validate([
            'id' => 'required',
            'purpose' => 'required|max:255',
            'employee_id' => 'required|exists:users,id',
            'starting_at' => 'date',
            'status_id' => 'required|exists:visit_application_statuses,id',
        ]);
        
        $visit = VisitApplication::findOrFail($validated['id']);

        if($user->hasRole('employee') && $visit['employee_id'] != $user['id']) {
            return redirect()->route('error', ['code' => '401']);
        }

        if($user->hasRole('user') && $visit['visitor_id'] != $user['id']) {
            return redirect()->route('error', ['code' => '401']);
        }

        $employee = User::findOrFail($validated['employee_id']);

        if($request['starting_at'])
        {

        $availableTime = AvailableTime::where('starting_at', '=', $validated['starting_at'])
                        ->where('user_id', '=', $employee->id)
                        ->get()
                        ->first();
        
        if(!$availableTime)
            return redirect()->route('error', ['code' => '404']);
            
        $validated['ending_at'] = $availableTime['ending_at'];

        // remove the previous available time and add a new one if necessary
        DB::table('available_times')
            ->where('user_id', $visit->employee_id)
            ->where('starting_at', $visit->starting_at)
            ->insert([
                'user_id' => $visit->employee_id,
                'starting_at' => $visit->starting_at,
                'ending_at' => $visit->ending_at
            ]);

        if($visit->employee_id != $validated['employee_id'] || $visit->starting_at != $validated['starting_at']) {
            DB::table('available_times')
                ->where('user_id', $validated['employee_id'])
                ->where('starting_at', $validated['starting_at'])
                ->delete();
        }
        }

        $visit->update($validated);
        return redirect()->route('appointments.index')->with('message', 'appointmentEditSuccess');
    }

    public function view($id)
    {
        $visitApplication = VisitApplication::findOrFail($id);
        $localeEntries = $this->prepareLocalizationEntries(['appointments', 'pagination', 'view', 'action']);

        $visitor = $visitApplication->visitor()->get()->first();
        $employee = $visitApplication->employee()->get()->first();

        $startingDate = $visitApplication->getStartingDate();
        $startingTime = $visitApplication->getStartingTime();
        $statusName = $visitApplication->getStatusName();

        $user = auth()->user();

        if($user->hasRole('user') )
        {
            $describedUser = $employee;
        } else if ($user->hasRole('employee') || $user->hasRole('admin')) {
            $describedUser= $visitor;
        }

        $describedUserRole = $describedUser->roles()->get()->first();
        $attributes = [
            'image' => [
                'path' => $visitor->getFirstMediaUrl(),
                'alt' => 'Avatar'
            ],
            'mainImageCaption' => [
                $describedUser['name']
            ],
            'detailedImageCaption' => [
                $describedUserRole['name']
            ],
        ];

        // Define different information arrays based on the role
        $infoBase = [
            "visit_applications.purpose" => $visitApplication['purpose'],
            "date" => $startingDate,
            "visit_applications.starting_at" => $startingTime,
            "visit_application_statuses.name" =>  $statusName
        ];

        $infoForEmployee = array_merge([
            "visit_applications.visitor_name" => $visitor['name'] . ' ' . $visitor['last_name'], 
        ], $infoBase);

        $infoForUser = array_merge([
            "visit_applications.employee_name" => $employee['name'] . ' ' . $employee['last_name'], 
        ], $infoBase);

        $infoForAdmin = array_merge([
            "visit_applications.visitor_name" => $visitor['name'] . ' ' . $visitor['last_name'], 
            "visit_applications.employee_name" => $employee['name'] . ' ' . $employee['last_name'], 
        ], $infoBase);

        // Choose the correct information array based on the user's role
        $user= auth()->user();
        if ($user->hasRole('user')) {
            $attributes['information'] = $infoForUser;
        } else if ($user->hasRole('employee')) {
            $attributes['information'] = $infoForEmployee;
        } else if ($user->hasRole('admin')) {
            $attributes['information'] = $infoForAdmin;
        }

        // Choose the correct information array based on the user's role
        $user= auth()->user();
        if ($user->hasRole('user')) {
            $attributes['information'] = $infoForUser;
        } else if ($user->hasRole('employee')) {
            $attributes['information'] = $infoForEmployee;
        } else if ($user->hasRole('admin')) {
            $attributes['information'] = $infoForAdmin;
        }
        
        $actions = [
            'back' => [
                'route' => route('appointments.index'),
                'type' => 'secondary'
            ],
            'edit' => [
                'route' => route('appointments.edit', ['id' => $visitApplication['id']]),
                'type' => 'primary'
            ],
        ];
        
        return Inertia::render('View', [
            'title' => 'viewingAppointment',
            'localeEntries' => $localeEntries,
            'routeName' => 'appointments.view',
            'attributes' => $attributes,
            'actions' => $actions,
            'activeNavbarElement' => $this->activeNavbarElement,
        ]);
    }
   public function index(Request $request) {
        $route = 'appointments.index';
        $actions = [];
        $user = auth()->user();

        if($user->can('apply for visit'))
        {
            $actions['apply'] = [
                'route' => route('appointments.apply'),
                'type' => 'primary'
            ];
        }

        $tableActions = $this->getUserTableActions($user);

        $this->columnsShown = $this->getUserColumns($user);
        $query = $this->getUserQuery($user);
        $this->prepareSortEntries();
        
        $this->getFilters($request);

        // Define the specific filter logic
        foreach($this->filters as $key => $value)
        {
            if($key == 'starting_at')
            {
                if($value['choice'] == '1')
                    $query->whereRaw("starting_at < now()");
                else if($value['choice'] == '2')
                    $query->whereRaw("starting_at > now()");
            }
            if($key == 'status' && $value['choice'] != 'all' && array_key_exists($value['choice'],$this->filters['status']['options']))
            {
                $query->where('visit_application_statuses.id', $value['choice']);
            }
        }

        // Make a clone of the query to count total results
        $countQuery = clone $query;
        $totalItemCount = $countQuery->count();

        $itemsPerPage = 4;
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $itemsPerPage;

        if($offset > $totalItemCount)
        {
            $page = 1;
            $offset = ($page - 1) * $itemsPerPage;
        }
        $query->offset($offset)->limit($itemsPerPage);
                        
        $this->getSort($request);
        // Sort is implemented fo one column at a time
        if($this->sort['order'] != '')
        {
            $query->orderBy($this->sort['attribute'], $this->sort['order']);
        }

                $results = $query->get()->toArray();
        $items = $this->makeRows($results, $tableActions, 'appointments'); 
        $itemCount = sizeof($results);
        if($itemCount > 0)
            $this->columns = $this->makeColumns($items[0]);

        foreach($items as &$item) 
        {
            $statusId = $item['visit_applications.status_id']['value'];
            $statusName = $item['visit_application_statuses.name']['value'];
            if($statusName != 'accepted')
            {
                $item['cancel']['hidden'] = true; 
            }
            if($statusName != 'pending')
            {
                $item['confirm']['hidden'] = true; 
            }
        }

        $localeEntries = $this->prepareLocalizationEntries([ 'appointments', 'pagination', 'table' ]);
        return Inertia::render('Index', [
            'filters' => $this->filters,
            'sortEntries' => $this->sortEntries,
            'sort' => $this->sort,
            'localeEntries' => $localeEntries,
            'actions' => $actions,
            'routeName' => $route,
            'columns' => $this->columns,
            'items' => $items,
            'itemCount' => $itemCount,
            'totalItemCount' => $totalItemCount,
            'page' => $page,
            'itemsPerPage' => $itemsPerPage
        ]);
    }
    private function getUserTableActions($user)
    {
        $tableActions = [];
        if($user->hasRole('admin'))
        {
            $tableActions[] = ['method' => 'get', 'action' => 'view'];
            $tableActions[] = ['method' => 'get', 'action' => 'edit'];
            $tableActions[] = ['method' => 'post', 'action' => 'delete'];
        }
        else if($user->hasRole('employee'))
        {
            $tableActions[] = ['method' => 'get', 'action' => 'view'];
            $tableActions[] = ['method' => 'post', 'action' => 'cancel'];
            $tableActions[] = ['method' => 'post', 'action' => 'confirm'];
        }
        else if($user->hasRole('user'))
        {
            $tableActions[] = ['method' => 'get', 'action' => 'view'];
            $tableActions[] = ['method' => 'post', 'action' => 'cancel'];
        }
        return $tableActions;
    }
    private function getUserQuery($user)
    {
        $query = DB::table('visit_applications')
            ->select(['visit_applications.id', ...$this->makeSelectColumns()])
            ->join('visit_application_statuses', 'visit_applications.status_id', '=', 'visit_application_statuses.id');

        $role = $user->roles->first();
        if(!$role->hasPermissionTo('view all visits'))
        {
            if($user->hasRole('user'))
            {
                $query = $query->join('users as employees', 'visit_applications.visitor_id', '=', 'employees.id')
                    ->where('visitor_id', '=', $user['id']);
            }
            else if($user->hasRole('employee'))
            {
                $query = $query->join('users', 'visit_applications.visitor_id', '=', 'users.id')
                    ->where('employee_id', '=', $user['id']);
            } 
        }  
        else 
        {
            $query = $query->join('users as employees', 'visit_applications.employee_id', '=', 'employees.id')
                ->join('users as users', 'visit_applications.visitor_id', '=', 'users.id');
        }
        return $query;
    }
    private function getUserColumns($user)
    {
        $columnsShown = [];
        if(!$user->hasPermissionTo('view all visits'))
        {
            if($user->hasRole('user'))
            {
                $columnsShown = [
                    ['column' => 'employees.name', 'sort' => true],
                    ['column' => 'visit_applications.purpose', 'sort' => true],
                    ['column' => 'visit_applications.starting_at', 'sort' => true],
                    ['column' => 'visit_applications.status_id', 'hidden' => true],
                    ['column' => 'visit_application_statuses.name', 'localized' => true ],
                ];
            }
            else if($user->hasRole('employee'))
            {
                $columnsShown = [
                    ['column' => 'users.name', 'sort' => true],
                    ['column' => 'visit_applications.purpose', 'sort' => true],
                    ['column' => 'visit_applications.starting_at', 'sort' => true],
                    ['column' => 'visit_applications.status_id', 'hidden' => true],
                    ['column' => 'visit_application_statuses.name', 'localized' => true ],
                ];
            } 
        }  
        else 
        {
            $columnsShown = [
                ['column' => 'visit_applications.id', 'sort' => true],
                ['column' => 'visit_applications.purpose', 'sort' => true],
                ['column' => 'users.name', 'sort' => true],
                ['column' => 'visit_applications.starting_at', 'sort' => true],
                ['column' => 'visit_applications.status_id', 'hidden' => true],
                ['column' => 'visit_application_statuses.name', 'localized' => true ],
            ];
        }
        return $columnsShown;
    }
}