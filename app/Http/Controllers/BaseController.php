<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BaseController extends Controller
{
    protected $filters = [];
    protected $sort = [];
    protected $sortEntries = [];
    protected $columnsShown = [];
    protected $baseRoute;
    protected $baseLocaleEntries = [
            'navbar',
            'languages',
            'header',
            'modal',
            'statuses'
    ];
    protected function prepareLocalizationEntries($keys)
    {
        $entries = [];
        $keys = array_merge($keys, $this->baseLocaleEntries);
        foreach ($keys as $key) {
            $newTranslations = trans($key);
            if (is_array($newTranslations)) {
                $entries = array_merge($entries, $newTranslations);
            }
        }
        return $entries;
    }

    protected function getFilters(Request $request) {
         $filterKeys = [];
        foreach($this->filters as $key => $val)
        {
            $filterKeys[$key] = '';
        }


        $chosenFilters = $request->validate([
            ...$filterKeys,
        ]);

        foreach ($this->filters as $attribute => $filter) {
            if (array_key_exists($attribute, $chosenFilters)) {
                $this->filters[$attribute]['choice'] = $chosenFilters[$attribute];
            }
        }
    }
    protected function getSort(Request $request) {
        $choices = $request->validate([
            'sortAttribute' => '',
            // '' is representative of no sort
            'sortOrder' => 'in:,asc,desc'
        ]);

        $this->sort = null;
        if (array_key_exists('sortAttribute', $choices) && array_key_exists('sortOrder', $choices)) {
            $this->sort = [
                'attribute' => $choices['sortAttribute'],
                'order' => $choices['sortOrder']
            ];
        } else {
            $this->sort = [
                'attribute' => '',
                'order' => ''
            ];
        }
    }

    protected function makeSelectColumns()
    {
        
        $selectColumns = [];
        foreach($this->columnsShown as $column)
        {
            $colName = $column['column'];
            $selectColumns[] = "$colName as $colName";
        }
        return $selectColumns;
    }

    protected function prepareSortEntries()
    {
        foreach($this->columnsShown as $column)
        {
            if(array_key_exists('sort', $column) && $column['sort'] === true)
            {
                $this->sortEntries[] = $column['column'];
            }
        }
    }

    protected function makeRows($results, $actions, $actionRoute)
    {
        $rows =[];
        forEach($results as $result)
        {
            $object = json_decode(json_encode($result), true);
            forEach($this->columnsShown as $column)
            {
                $hidden = $this->checkColumnProperty($column, 'hidden');
                $localized = $this->checkColumnProperty($column, 'localized');
                $record[$column['column']] = [
                    'value' => $object[$column['column']],
                    'type' => 'text',
                    'hidden' => $hidden,
                    'localized' => $localized
                ];
            }
            forEach($actions as $action)
            {

                if($action['method'] == 'get')
                {
                    $record[$action['action']] = [
                        'type' => 'button',
                        'method' => 'get',
                        'action' => route($this->baseRoute.'.'.$action['action'], ['id' => $object['id']]),
                    ];
                }
                else if($action['method'] == 'post')
                {
                    $record[$action['action']] = [
                        'type' => 'button',
                        'method' => 'post',
                        'data' => ['id' => $object['id']],
                        'action' => route($this->baseRoute.'.'.$action['action']),
                    ];
                }
            }
            $rows[] = $record;
        }
        return $rows;
    }
   protected function makeColumns($row)
    {
        $columns = [];
        foreach($row as $key => $val)
        {
            if($this->checkColumnProperty($val, 'hidden'))
                continue;
            if($val['type'] == 'text')
            {
                $columns[$key] = $key;
            }
            if($val['type'] == 'button')
            {
                $columns[$key] = '';
            }
        }
        return $columns;
    }

    protected function checkColumnProperty($column, $propertyName)
    {
        if (array_key_exists($propertyName, $column) && $column[$propertyName]) {
            return true;
        } else {
            return false;
        }
    }


}