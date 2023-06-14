@extends('layout')
@section('content')
	<div class="overflow-hidden pt-32 w-full h-full bg-slate-50">
		@include('navbar')
		<div class='flex mx-[13%] mt-10 mb-32 overflow-hidden space-x-5'>
			<div class='flex-col w-8/12'>
				<div class='overflow-hidden px-10 py-20 pb-32 bg-white rounded-2xl'>
					<x-section-header :title="'Overview'"/>
					@include('infopanel')
				</div>
			</div>
			<div class='flex-col w-4/12'>
				<div class='flex-1 px-10 py-20 bg-white rounded-2xl'>
					<x-section-header :title="'Recent reviews'"/>
					@include('review_box')
					<x-section-header :title="'Next appointment'"/>
				</div>
			</div>
		</div>
	</div>
@endsection