<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Office;
use App\Models\Workplace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OfficeController extends BaseController
{
    protected $filters = [];
    protected $activeNavbarElement = 'offices.index';
    protected $baseRoute = 'offices';
    protected $sort;
    protected $columns;

    public function index(Request $request)
    {
        $route = 'offices.index';
        $actions = [];
        $user = auth()->user();

        if($user->can('create offices'))
        {
            $actions['create'] = [
                'route' => route('offices.create'),
                'type' => 'primary'
            ];
        }

        $tableActions = $this->getUserTableActions($user);

        $this->columnsShown = $this->getUserColumns($user);
        $query = $this->getUserQuery($user);
        $this->prepareSortEntries();
        
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
        // Sort is implemented for one column at a time
        if($this->sort['order'] != '')
        {
            $query->orderBy($this->sort['attribute'], $this->sort['order']);
        }

        $this->getFilters($request);

        $results = $query->get()->toArray();
        $items = $this->makeRows($results, $tableActions, 'offices'); 
        $itemCount = sizeof($results);
        if($itemCount > 0)
            $this->columns = $this->makeColumns($items[0]);

        $localeEntries = $this->prepareLocalizationEntries(['offices', 'pagination', 'table' ]);
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

    public function create(Request $request)
    {
        $localeEntries = $this->prepareLocalizationEntries(['offices', 'pagination', 'navbar', 'languages', 'header', 'form']);
        $user = auth()->user();
        if(!$user->can('create offices'))
        {
            redirect();
        }

        $departments = Department::all()->toArray();
        
        $actions = [
            'back' => [
                'route' => route('offices.index'),
                'type' => 'secondary'
            ],
            'save' => [
                'route' => false,
                'type' => 'primary'
            ],
        ];

        return Inertia::render('Offices/Create', [
            'departments' => $departments,
            'localeEntries' => $localeEntries,
            'actions' => $actions
        ]);
    }

    public function edit($id)
    {
        // Find the office with the given ID
        $office = Office::findOrFail($id);

        // Get all the departments
        $departments = Department::all()->toArray();

        // Prepare the localization entries
        $localeEntries = $this->prepareLocalizationEntries(['offices', 'pagination', 'navbar', 'languages', 'header', 'form']);

        $actions = [
            'back' => [
                'route' => route('offices.index'),
                'type' => 'secondary'
            ],
            'save' => [
                'route' => false,
                'type' => 'primary'
            ],
        ];

        // Render the Offices/Edit page with the office data
        return Inertia::render('Offices/Edit', [
            'office' => $office,
            'departments' => $departments,
            'localeEntries' => $localeEntries,
            'actions' => $actions
        ]);
    }




    public function view($id)
    {
        $office = Office::findOrFail($id);
        $localeEntries = $this->prepareLocalizationEntries(['offices', 'pagination', 'view', 'action']);

        $department = $office->department()->get()->first();

        $user = auth()->user();

        $attributes = [
            'image' => [
                'path' => $office->getFirstMediaUrl(),
                'alt' => 'Office Image'
            ],
            'mainImageCaption' => [
                $office['id']
            ],
            'detailedImageCaption' => [
                'offices.id'
            ]
        ];

        $infoBase = [
            "offices.presenting_ability" => $office['presenting_ability'],
            "offices.capacity" => $office['capacity'],
            "offices.workplace_count" =>  $office['workplace_count'],
            "departments.name" =>  $department['name']
        ];

        $infoForAdmin = [
            ...$infoBase, 
            "offices.department_id" => $department['id'],
            "offices.employee_using_possibility" => $office['employee_using_possibility'],
        ];

        $infoForEmployee = [
            ...$infoBase, 
            "offices.employee_using_possibility" => $office['employee_using_possibility'],
        ];

        $infoForUser = [
            ...$infoBase, 
        ];


        // Choose the correct information array based on the user's role
        if ($user->hasRole('admin')) {
            $attributes['information'] = $infoForAdmin;
        } else if ($user->hasRole('employee')) {
            $attributes['information'] = $infoForEmployee;
        } else if ($user->hasRole('user')) {
            $attributes['information'] = $infoForUser;
        }

        $actions = [
            'back' => [
                'route' => route('offices.index'),
                'type' => 'secondary'
            ],
            'edit' => [
                'route' => route('offices.edit', ['id' => $office['id']]),
                'type' => 'primary'
            ],
        ];

        return Inertia::render('View', [
            'title' => 'viewingOffice',
            'localeEntries' => $localeEntries,
            'attributes' => $attributes,
            'actions' => $actions,
            'activeNavbarElement' => $this->activeNavbarElement, 
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user->can('create offices')) {
            return redirect()->route('error', ['code' => '401']);
        }

        $validated = $request->validate([
            'presenting_ability' => 'required|boolean',
            'capacity' => 'required|integer|gte:workplace_count',
            'employee_using_possibility' => 'required|boolean',
            'workplace_count' => 'required|integer',
            'department_id' => 'required|exists:departments,id',
            'office_image' => 'required|image|max:2048'
        ]);

        $validated['user_id'] = $user->id;

        $office = Office::create($validated);

        if ($request->hasFile('office_image')) {
            $office->addMediaFromRequest('office_image')->toMediaCollection();
        }

        // Create Workplace instances for the office
        $office->updateWorkplaces();
     

        return redirect()->route('offices.index')->with('message', 'officeCreationSuccess');
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        if (!$user->can('edit all offices')) {
            return redirect()->route('error', ['code' => '401']);
        }

        // Validate the request data
        $validated = $request->validate([
            'id' => 'required',
            'presenting_ability' => 'required|boolean',
            'capacity' => 'required|integer|gte:workplace_count',
            'employee_using_possibility' => 'required|boolean',
            'workplace_count' => 'required|integer',
            'department_id' => 'required|exists:departments,id',
            'office_image' => 'nullable|image|max:2048',
        ]);

        // Find the office with the given ID
        $office = Office::findOrFail($request['id']);

        // Update the office data
        $office->presenting_ability = $validated['presenting_ability'];
        $office->capacity = $validated['capacity'];
        $office->employee_using_possibility = $validated['employee_using_possibility'];
        $office->workplace_count = $validated['workplace_count'];
        $office->department_id = $validated['department_id'];
        
        // If an image is provided
        if($request->file('office_image')) {
            // Remove existing images
            $office->clearMediaCollection();

            // Attach the new image
            $office->addMediaFromRequest('office_image')->toMediaCollection();
        }

        $office->updateWorkplaces();

        // Save the changes
        $office->save();

        // Redirect back to the offices index with a success message
        return redirect()->route('offices.edit', ['id' => $office->id])->with('message', 'officeUpdateSuccess');
    }

    public function delete(Request $request)
    {
        $officeId = $request->id; // retrieve the visit id from the request
        if(!$officeId)
        {
            return redirect()->route('error', ['code' => '401']);
        }

        $user = auth()->user();
        if (!$user->can('delete all offices')) {
            return redirect()->route('error', ['code' => '401']);
        }

        $office = Office::find($officeId);
        if(!$office)
        {
            return redirect()->route('error', ['code' => '401']);
        }

        $workplaces = $office->workplaces()->get();

        // Free the associated models
        $office->workplace_count = 0;
        $office->updateWorkplaces();
        $office->delete();

        return back()->withInput()->with('message', 'officeDeletionSuccess');
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
        }
        else if($user->hasRole('user'))
        {
            $tableActions[] = ['method' => 'get', 'action' => 'view'];
        }
        return $tableActions;
    }

    private function getUserQuery($user)
    {
        $query = DB::table('offices')
            ->select(['offices.id', ...$this->makeSelectColumns()]);

        $role = $user->roles->first();
        if(!$role->hasPermissionTo('view all offices'))
        {
            if($user->hasRole('user'))
            {
                $query = $query->where('employee_using_possibility', '=', false);
            }
            else if($user->hasRole('employee'))
            {
                $query = $query->where('employee_using_possibility', '=', true);
            } 
        }  
        return $query;
    }

    private function getUserColumns($user)
    {
        $columnsShown = [];
        if(!$user->hasPermissionTo('view all offices'))
        {
            if($user->hasRole('user'))
            {
                $columnsShown = [
                    ['column' => 'offices.id', 'sort' => true],
                    ['column' => 'offices.capacity', 'sort' => true],
                    ['column' => 'offices.presenting_ability'],
                    ['column' => 'offices.employee_using_possibility', 'hidden' => true]
                ];
            }
            else if($user->hasRole('employee'))
            {
                $columnsShown = [
                    ['column' => 'offices.id', 'sort' => true],
                    ['column' => 'offices.capacity', 'sort' => true],
                    ['column' => 'offices.presenting_ability', 'localized' => true],
                    ['column' => 'offices.employee_using_possibility', 'localized' => true]
                ];
            } 
        }  
        else 
        {
            $columnsShown = [
                ['column' => 'offices.id', 'sort' => true],
                ['column' => 'offices.capacity', 'sort' => true],
                ['column' => 'offices.presenting_ability'],
                ['column' => 'offices.workplace_count', 'sort' => true],
                ['column' => 'offices.department_id', 'sort' => true],
                ['column' => 'offices.employee_using_possibility', 'localized' => true]
            ];
        }
        return $columnsShown;
    }



}
