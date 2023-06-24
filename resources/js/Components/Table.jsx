import PrimaryButton from "./PrimaryButton";
import {  useEffect, useState } from "react";
import { useFilters, useFilterUpdate } from "./FilterContext";
import { router, Link } from "@inertiajs/react";
import _ from "lodash";
import { useSort, useSortUpdate } from "./SortContext";

const firstCellTopSpacing = 10;

export function TableButtonCell({children, className, href, isFirst, ...props})
{
	return (
		<TableCell className={`flex justify-center items-center w-full ${isFirst ? `pb-5 pt-${firstCellTopSpacing}` : ''} ${className}`}>
			<a href={href}>
				<div className='flex justify-center items-center' >
					<PrimaryButton className='flex justify-center items-center h-full bg-slate-600'>
						<div className='px-2 py-1 text-xl uppercase'>
							{children}
						</div>
					</PrimaryButton>
				</div>
			</a>
		</TableCell>
	);
}

export function TableCell({children, className, isFirst, ...props})
{
	return (
		<td>
			<div className={`flex px-5 py-6 text-2xl ${isFirst ? `pb-5 pt-${firstCellTopSpacing}` : ''} ${className}`}>
				{children}
			</div>
		</td>
	);
}

export function Thead({sortEntries, entries, children, className, ...props})
{
	let key = 0;

	return (
		<thead align='left' className='p-10 uppercase bg-slate-200 text-slate-400'>
			<tr>
				{ entries.map(function (entry) {
					++key;
					return (
						<TableHeader key={key}>
							{entry !== '' && sortEntries.includes(entry.toLowerCase()) ?
								<TableColumnSortHeader entry={entry} children={entry}/> 
								: entry }
						</TableHeader>
					);
				}) }
			</tr>
		</thead>
	);
}

export function TableRow({children, className, ...props})
{
	return (
		<tr className="border-b-2">
			{children}
		</tr>
	);
}

export function Table({children, className, ...props})
{
	return (
		<div className={`flex overflow-hidden flex-col mt-12 w-full rounded-xl ${className}`}>
			<table className='w-full table-auto'>
				{children}	
			</table>
		</div>
	);
}

export function TableHeader({children, className, ...props})
{
	return (
		<th>
			<div className={`p-5 text-2xl text-slate-500 ${className}`}>
				{children}
			</div>
		</th>
	);
}

function getNewFilterRequest(filters)
{
	let chosenFilterOptions = {};
	Object.entries(filters).forEach(([key, value]) => {
		// To avoid redundant 'all' filters in the request parameters
		if(value['choice'] != 'all')
		{
			chosenFilterOptions[key] = value['choice'];
		}
	});

	return chosenFilterOptions;
}

function getNewSortRequest(sort) {
	if (sort['attribute'] != '' && sort['order'] != '')
	{
		return {
			['sortAttribute']: sort['attribute'],
			['sortOrder']: sort['order']
		};
	} else {
		return {};
	}
}

export function TableFilters({route,attributes, ...props})
{
	const [isMounted, setIsMounted] = useState(false);
	const [isInitialValuesSet, setIsInitialValuesSet] = useState(false);

	const newSort = useSort();
	const [setSort, clearSort] = useSortUpdate();

	const newFilters = useFilters();
	const [setFilter, clearFilters] = useFilterUpdate();

	useEffect(() => {
		setIsMounted(true);
	},[]);

	let currentSort, currentFilters
	useEffect(() => {
		if(isMounted)
		{
			currentSort = _.cloneDeep(newSort);
			currentFilters = _.cloneDeep(newFilters);;
			setIsInitialValuesSet(true);
		}
	}, [isMounted]);
	
	function handleClearFilters(e) {
		e.preventDefault();
		clearFilters();
	}
	
	function handleClearSort(e) {
		clearSort();
	}
		
	useEffect(() => {
		if(!isInitialValuesSet || (_.isEqual(newFilters, currentFilters) && _.isEqual(newSort, currentSort))) {
			return;
		}
		const newFilterRequest = getNewFilterRequest(newFilters);
		const newSortRequest = getNewSortRequest(newSort); 

		router.get(route, {...newFilterRequest, ...newSortRequest});
	}, [newFilters, newSort]);

	

	return (
		<div className='flex justify-center items-center space-x-10 text-xl'>

			{ Object.entries(attributes).map(([key, value]) => {
				return (
				<Choice
						title={key}
						key={key}
						attribute={key}
						options={value['options']}
						pickedOption={value['choice']}
					/>
					);
			}) }

			<Link onClick={handleClearFilters}>Clear filters</Link>
			<Link onClick={handleClearSort}>Clear sort</Link>

		</div>
	);
}

export function TableColumnSortHeader({entry, children, className, href, ...props})
{
	const sort = useSort();
	const [sortUpdate, clearSort] = useSortUpdate();
	
	let initialOrder = '';
	if(sort['attribute'] == entry) {
		initialOrder = sort['order'];
	}
	const [order, setOrder] = useState(initialOrder);
	useEffect(()=> {
		sortUpdate(entry, order);
	},[order]);
	
	function handleClick() {
		if(order == '') {
			setOrder('asc');
		}
		else if(order == 'asc') {
			setOrder('desc');
		}
		else if(order == 'desc') {
			setOrder('asc');
		}
	}

	let headerTrail = '';
	switch(order) {
		case 'asc':
			headerTrail = (<i className="fa-solid fa-caret-up"/>);
			break;
		case 'desc':
			headerTrail = (<i className="fa-solid fa-caret-down"/>);
			break;
		default:
			break;
	}

	return (
		<div>
			<button onClick={handleClick}>
				{children} &nbsp;
				{headerTrail}	
			</button>
		</div>
	);
}

export function Choice({title, pickedOption, options, attribute, className, children, ...props})
{
	const filters = useFilters();
	const [setFilter, clearFilters] = useFilterUpdate();

	useEffect(() => {
		setFilter(attribute, pickedOption);
	}, []);

	function handleChange(e)
	{
		setFilter(attribute, e.target.value);
	}

	return (
		<div className="flex items-center space-x-5">

			<div className="text-2xl">
				{title}:
			</div>

			<div>

				<select onChange={handleChange}
						defaultValue={pickedOption}
						className="flex items-center py-1 pl-6 w-32 h-10 text-xl rounded-lg"
						name="time"
						id=""
				>
					{ options.map( function(el) {
							return (
								<option value={el}
										key={el} >
									{el}
								</option>
							);
						}) }
				</select>	

			</div>

		</div>
	);
}