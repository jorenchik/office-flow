
import { makeClasses } from '@/Helpers/classHelper'
import { Link } from '@inertiajs/react'


export default function Navbar({className, activeElement})
{
	const classes = makeClasses("flex h-[5rem]", className);

	const elements = [
		['Dashboard', route('dashboard')],
		['Appointments', route('appointments')],
		['Check Ins', route('checkin')],
		['Offices', route('offices')],
		['Reviews', route('reviews')] 
	];

	let items = []
	let itemKey = 0 

	return (
		<div className={classes}> 
			{elements.map((el) => {
				++itemKey;
				return (
				<Link href={el[1]} key={itemKey} method="get" as="button">
					{ el[0] === activeElement ? 
					<div className="navbar-link navbar-link__active">
						<span className="m-auto font-bold">{el[0]}</span>
					</div>
					:
					<div className="navbar-link">
						<span className="m-auto font-bold">{el[0]}</span>
					</div>}
				</Link>
				)
			})}
		</div>
	)
}