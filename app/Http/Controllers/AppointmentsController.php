<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentsController extends BaseController
{
    //
    public function show(Request $request)
    {
        $filters = [
            'time' => [
                'options' => ['all', 'past', 'future'],
                'choice' => 'all'
            ],
            'place' => [
                'options' => ['all', '1stbranch', '2ndbranch'],
                'choice' => 'all'
            ]
        ];

        // Place cannot be sorted in this instance 
        $sortEntries = ['name', 'email', 'date', 'time'];
        $choices = $request->validate([
            'time' => '',
            'place' => '',
            'sortAttribute' => '',
            // '' is representative of no sort
            'sortOrder' => 'in:,asc,desc'
        ]);

        $sort = null;
        if (array_key_exists('sortAttribute', $choices) && array_key_exists('sortOrder', $choices)) {
            $sort = [
                'attribute' => $choices['sortAttribute'],
                'order' => $choices['sortOrder']
            ];
        } else {
            $sort = [
                'attribute' => '',
                'order' => ''
            ];
        }

        foreach ($filters as $attribute => $filter) {
            if (array_key_exists($attribute, $choices)) {
                $filters[$attribute]['choice'] = $choices[$attribute];
            }
        }

        $localeEntries = $this->prepareLocalizationEntries(['appointments', 'pagination', 'navbar', 'languages', 'header', 'table']);

        return Inertia::render('Appointments', [
            'filters' => $filters,
            'sort' => $sort,
            'sortEntries' => $sortEntries,
            'localeEntries' => $localeEntries
        ]);
    }
}