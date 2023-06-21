import PrimaryButton from "./PrimaryButton";

const firstCellTopSpacing = 10;

function TableButtonCell({children, className, href, isFirst, ...props})
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

function TableCell({children, className, isFirst, ...props})
{
	return (
		<td>
			<div className={`flex px-5 py-6 text-2xl ${isFirst ? `pb-5 pt-${firstCellTopSpacing}` : ''} ${className}`}>
				{children}
			</div>
		</td>
	);
}

function Thead({entries, children, className, ...props})
{
	let key = 0;

	return (
		<thead align='left' className='p-10 uppercase bg-slate-200 text-slate-400'>
			<tr>
				{ entries.map(function (entry) {
					++key;
					return (
						<TableHeader key={key}>
							{entry}	
						</TableHeader>
					);
				}) }
			</tr>
		</thead>
	);
}

function TableRow({children, className, ...props})
{
	return (
		<tr className="border-b-2">
			{children}
		</tr>
	);
}

function Table({children, className, ...props})
{
	return (
		<div className={`flex overflow-hidden flex-col mt-16 w-full rounded-xl ${className}`}>
			<table className='w-full table-auto'>
				{children}	
			</table>
		</div>

	);
}

function TableHeader({children, className, ...props})
{
	return (
		<th>
			<div className={`p-5 text-2xl text-slate-500 ${className}`}>
					{children}
			</div>
		</th>
	);
}

export {TableButtonCell, TableCell, Thead, TableRow, Table, TableHeader}