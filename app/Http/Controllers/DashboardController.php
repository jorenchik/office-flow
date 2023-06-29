<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Carbon\CarbonInterval;

class DashboardController extends BaseController
{

    public function show() {
        $user = auth()->user();
        if(!$user->can('view dashboard'))
        {
            return redirect('/');
        }

        $minutesAtWork = $user->getTimeAtWork();

        if($minutesAtWork)
        {
            $interval = CarbonInterval::seconds($minutesAtWork);
            $timeAtWork = $interval->cascade()->forHumans(['short' => true]);
        } else {
            $timeAtWork = null;
        }
        
        $now = Carbon::now()->format('H:i');
        $weekDay = Carbon::now()->format('l');
        
        $lastCheckIn = $user->getLastStartCheckInToday();
        
        if($lastCheckIn)
        {
            $lastCheckInTime = Carbon::createFromFormat('Y-m-d H:i:s',$lastCheckIn->registered_at);
        } else 
        {
            $lastCheckInTime = null; 
        }

        $visitsThisMonth = $user->getVisitsInCurrentMonth();
        $visitsThisWeek = $user->getVisitsInCurrentWeek();
        $checkInsThisMonth = $user->getCheckInsInCurrentMonth();
        $checkInsThisWeek = $user->getCheckInsInCurrentWeek();

        $infoPanels = [
            ['number' => $visitsThisMonth, 'changePercent' => 0, 'text' => 'visitsThisDay'],
            ['number' => $visitsThisWeek, 'changePercent' => 0, 'text' => 'visitsThisWeek'],
            ['number' => $checkInsThisMonth, 'changePercent' => 0, 'text' => 'checkInsThisMonth'],
            ['number' => $checkInsThisWeek, 'changePercent' => 0, 'text' => 'checkInsThisWeek']
        ];


        $localeEntries = $this->prepareLocalizationEntries(['pagination', 'navbar', 'languages', 'header', 'dashboard', 'weekdays']);
        return Inertia::render('Dashboard', [
            'localeEntries' => $localeEntries,
            'timeAtWork' => $timeAtWork,
            'now' => $now,
            'weekDay' => $weekDay,
            'lastRegistered' => $lastCheckInTime ? $lastCheckInTime->format('H:i') : 'N/A',
            'infoPanels' => $infoPanels,
        ]);
    }

}
