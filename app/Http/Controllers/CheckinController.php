<?php

namespace App\Http\Controllers;

use App\Models\CheckInOut;
use App\Models\CheckInOutType;
use App\Models\Department;
use App\Models\Office;
use App\Models\Workplace;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckinController extends BaseController
{
    // Define your filters
    protected $filters = [
        'department' => [
            'options' => [],
            // We'll populate this dynamically later
            'choice' => 'all',
        ]
    ];
    protected $baseRoute = 'checkin';
    protected $activeNavbarElement = 'checkin.index';
    protected $columns;

    protected $sort;

    public function __construct()
    {
        $departments = DB::table('departments')->get();
        $this->filters['department']['options'] = [ 'all',...$departments->mapWithKeys(function ($item) {
            return [$item->id => $item->name];
        })->toArray()];
    }
    public function index(Request $request)
    {
        $route = 'checkin.index';
        $actions = [];
        $user = auth()->user();

        // Modify this as per your requirements.
        if ($user->can('check in')) {
            $actions['register'] = [
                'route' => route('checkin.register'),
                'type' => 'primary'
            ];
        }

        $tableActions = $this->getUserTableActions($user);

        $this->getFilters($request);

        $this->columnsShown = $this->getUserColumns($user);
        $query = $this->getUserQuery($user);
        $this->prepareSortEntries();

        // Now in your `index` method, when you're setting up your query:
        foreach($this->filters as $key => $value)
        {
            if($key == 'department' && $value['choice'] != 'all' && array_key_exists($value['choice'],$this->filters['department']['options']))
            {
                $query->where('departments.id', $value['choice']);
            }
        }

        // Make a clone of the query to count total results
        $countQuery = clone $query;
        $totalItemCount = $countQuery->count();
        $itemsPerPage = 4;
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $itemsPerPage;

        if ($offset > $totalItemCount) {
            $page = 1;
            $offset = ($page - 1) * $itemsPerPage;
        }
        $query->offset($offset)->limit($itemsPerPage);

        $this->getSort($request);

        // Sort is implemented for one column at a time
        if ($this->sort['order'] != '') {
            $query->orderBy($this->sort['attribute'], $this->sort['order']);
        }
        $results = $query->get()->toArray();
        $items = $this->makeRows($results, $tableActions, 'checkInOuts');
        $itemCount = sizeof($results);
        if ($itemCount > 0)
            $this->columns = $this->makeColumns($items[0]);

        $localeEntries = $this->prepareLocalizationEntries(['checkins', 'pagination', 'table']);
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
        if ($user->hasRole('admin')) {
            $tableActions[] = ['method' => 'get', 'action' => 'view'];
            $tableActions[] = ['method' => 'get', 'action' => 'edit'];
            $tableActions[] = ['method' => 'post', 'action' => 'delete'];
        } else if ($user->hasRole('employee')) {
            $tableActions[] = ['method' => 'get', 'action' => 'view'];
        }
        return $tableActions;
    }

    private function getUserQuery($user)
    {
        $query = DB::table('check_in_outs')
            ->select(['check_in_outs.id', ...$this->makeSelectColumns()])
            ->join('users', 'check_in_outs.user_id', '=', 'users.id')
            ->join('workplaces', function ($join) {
                        $join->on('workplaces.id','=', 'check_in_outs.workplace_id')
                            ->on('workplaces.office_id', '=', 'check_in_outs.office_id');
                    })
            ->join('offices', 'workplaces.office_id', '=', 'offices.id')
            ->join('departments', 'offices.department_id', '=', 'departments.id')
            ->join('check_in_out_types', 'check_in_outs.type_id', '=', 'check_in_out_types.id');

        if (!$user->hasPermissionTo('view all check ins')) {
            $query = $query->where('user_id', '=', $user['id']);
        }
        
        return $query;
    }

    private function getUserColumns($user)
    {
        $columnsShown = [];
        if ($user->hasRole('employee')) {
            $columnsShown = [
                ['column' => 'check_in_outs.id', 'hidden' => true],
                ['column' => 'offices.id'],
                ['column' => 'departments.name'],
                ['column' => 'check_in_outs.registered_at', 'sort' => true],
                ['column' => 'check_in_out_types.name', 'sort' => true, 'localized' => true],
                ['column' => 'check_in_outs.user_id', 'hidden' => true],
                ['column' => 'check_in_outs.type_id', 'hidden' => true],
                ['column' => 'check_in_outs.workplace_id', 'hidden' => true],
            ];
        } else if ($user->hasRole('admin')) {
            $columnsShown = [
                ['column' => 'check_in_outs.id', 'sort' => true],
                ['column' => 'offices.id'],
                ['column' => 'check_in_outs.registered_at', 'sort' => true],
                ['column' => 'check_in_out_types.name', 'sort' => true],
                ['column' => 'users.name', 'sort' => true],
                ['column' => 'check_in_outs.type_id'],
                ['column' => 'check_in_outs.workplace_id'],
            ];
        }
        return $columnsShown;
    }


    public function view($id)
    {
        $checkIn = CheckInOut::findOrFail($id);

        $localeEntries = $this->prepareLocalizationEntries(['checkins', 'pagination', 'view', 'action']);

        $user = $checkIn->user;
        $type = CheckInOutType::find($checkIn->type_id);
        $workplace = $checkIn->workplace;
        $office = $checkIn->office;
        $registeredAt = Carbon::parse($checkIn->registered_at)->format('Y-m-d H:i:s');

        $attributes = [
            'image' => [
                'path' => $user->getFirstMediaUrl(),
                'alt' => 'Avatar'
            ],
            'mainImageCaption' => $user->name,
            'detailedImageCaption' => [$user->roles()->get()->first()->name],
            'information' => [
                "check_in_outs.registered_at" => $registeredAt,
                "check_in_out_types.name" => $type->name,
                "workplaces.id" => $workplace->id,
                "offices.id" => $office->id
            ],
        ];

        $actions = [
            'back' => [
                'route' => route($this->baseRoute.'.index'),
                'type' => 'secondary'
            ],
            'edit' => [
                'route' => route($this->baseRoute.'.edit', ['id' => $checkIn->id]),
                'type' => 'primary'
            ],
        ];

        return Inertia::render('View', [
            'routeName' => 'viewingCheckIn',
            'localeEntries' => $localeEntries,
            'attributes' => $attributes,
            'actions' => $actions,
            'activeNavbarElement' => $this->activeNavbarElement,
        ]);
    }



    public function register(Request $request)
    {
        $user = auth()->user();

        if(!$user->can('check in'))
        {
            return redirect()->route('error', ['code' => '401']);
        }

        $localeEntries = $this->prepareLocalizationEntries(['checkins', 'pagination', 'navbar', 'languages', 'header', 'form']);
        $departmentId = $request->input('department_id');
        $officeId = $request->input('office_id');
        $workplaceId = $request->input('workplace_id');

        $departments = Department::all()->toArray();
        $offices = [];
        $workplaces = [];


        if ($departmentId) {
            $offices = Office::where('department_id', '=', $departmentId)->get()->toArray();
        }

        if ($officeId) {
            $workplaces = Workplace::where('office_id', '=', $officeId)->get()->toArray();
        }

        $typeNames = $user->getAvailableCheckInTypes(); // Assuming you have a CheckInOutType model for the types
        $types = CheckInOutType::whereIn('name', $typeNames)->get()->toArray();

        $actions = [
            'back' => [
                'route' => route($this->baseRoute.'.index'),
                'type' => 'secondary'
            ],
            'save' => [
                'route' => false,
                'type' => 'primary'
            ],
        ];

        return Inertia::render('CheckIns/Register', [
            'departments' => $departments,
            'offices' => $offices,
            'workplaces' => $workplaces,
            'types' => $types,
            'activeNavbarElement' => $this->activeNavbarElement,
            'chosenDepartmentId' => $departmentId,
            'chosenOfficeId' => $officeId,
            'chosenWorkplaceId' => $workplaceId,
            'localeEntries' => $localeEntries,
            'actions' => $actions
        ]);
    }

    public function edit($id, Request $request)
    {
        $user = auth()->user();

        if(!$user->can('edit all check ins'))
        {
            return redirect()->route('error', ['code' => '401']);
        }

        $localeEntries = $this->prepareLocalizationEntries(['checkins', 'pagination', 'navbar', 'languages', 'header', 'form']);

        // Load all departments and types initially
        $departments = Department::all()->toArray();
        $types = CheckInOutType::all()->toArray();

        // retrieve the check-in object to edit
        $checkIn = CheckInOut::find($id);
        if(!$checkIn)
        {
            return redirect()->route('error', ['code' => '404']);
        }

        // get the selected department, office, workplace, and type for this check-in
        $chosenWorkplaceId = $checkIn->workplace_id;
        $chosenOfficeId = $request->input('office_id') ?? $checkIn->office_id;
        $chosenDepartmentId = $request->input('department_id') ?? Office::find($chosenOfficeId)->department_id;
        $chosenTypeId = $checkIn->type_id;
        $registeredAt = $checkIn->registered_at; 

        if(is_string($chosenOfficeId))
            $chosenOfficeId = intval($chosenOfficeId);
        if(is_string($chosenDepartmentId))
            $chosenDepartmentId = intval($chosenDepartmentId);


        // Load offices based on the chosen department and workplaces based on the chosen office
        $offices = Office::where('department_id', '=', $chosenDepartmentId)->get()->toArray();
        $workplaces = Workplace::where('office_id', '=', $chosenOfficeId)->get()->toArray();
        

        $actions = [
            'back' => [
                'route' => route($this->baseRoute.'.index'),
                'type' => 'secondary'
            ],
            'save' => [
                'route' => false,
                'type' => 'primary'
            ],
        ];

        return Inertia::render('CheckIns/Edit', [
            'departments' => $departments,
            'offices' => $offices,
            'workplaces' => $workplaces,
            'types' => $types,
            'activeNavbarElement' => $this->activeNavbarElement,
            'chosenDepartmentId' => $chosenDepartmentId,
            'chosenOfficeId' => $chosenOfficeId,
            'registeredAt' => $registeredAt,
            'chosenWorkplaceId' => $chosenWorkplaceId,
            'chosenTypeId' => $chosenTypeId,
            'localeEntries' => $localeEntries,
            'actions' => $actions
        ]);
    }


    public function store(Request $request)
    {
        $user = auth()->user();

        if (!$user->can('edit all check ins')) {
            return redirect()->route('error', ['code' => '401']);
        }

        $validated = $request->validate([
            'department_id' => 'required|exists:departments,id',
            'office_id' => 'required|exists:offices,id',
            'workplace_id' => 'required|exists:workplaces,id',
            'registered_at' => 'required',
            'type_id' => 'required|exists:check_in_out_types,id',
        ]);

        $checkIn = new CheckInOut;
        $checkIn->user_id = $user->id;
        $checkIn->office_id = $validated['office_id'];
        $checkIn->registered_at = Carbon::parse($validated['registered_at'])->format('Y-m-d H:i:s');
        $checkIn->workplace_id = $validated['workplace_id'];
        $checkIn->type_id = $validated['type_id'];
        $checkIn->save();

        return redirect()->route($this->baseRoute.'.index')->with('message', 'checkInStoreSuccess');
    }

    public function storeEmployee(Request $request)
    {
        $user = auth()->user();

        if (!$user->can('check in')) {
            return redirect()->route('error', ['code' => '401']);
        }

        $validated = $request->validate([
            'type_id' => 'required|exists:check_in_out_types,id',
            'workplace_id' => 'required|exists:workplaces,id',
            'office_id' => 'required|exists:offices,id',
        ]);

        $checkIn = new CheckInOut;
        $checkIn->user_id = $user['id'];
        $checkIn->type_id = $validated['type_id'];
        $checkIn->workplace_id = $validated['workplace_id'];
        $checkIn->office_id = $validated['office_id'];
        $checkIn->registered_at = Carbon::now()->format('Y-m-d H:i:s');
        $checkIn->save();

        return redirect()->route($this->baseRoute.'.index')->with('message', 'employeeCheckInStoreSuccess');
    }


    public function delete(Request $request)
    {
        $user = auth()->user();
        $checkInId = $request->id; // retrieve the checkin id from the request

        if(!$checkInId) {
            return redirect()->route('error', ['code' => '404']);
        }

        if(!$user->can('delete all check ins')) {
            return redirect()->route('error', ['code' => '401']);
        }

        $checkIn = CheckInOut::find($checkInId);

        if(!$checkIn) {
            return redirect()->route('error', ['code' => '404']);
        }

        $checkIn->delete();

        return redirect()->route($this->baseRoute.'.index')->with(['message' => 'checkinDeleteSuccess']);
    }


}