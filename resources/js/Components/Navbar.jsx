
import HeaderLink from '@/Components/HeaderLink'
import ApplicationLogo from './ApplicationLogo'
import { makeClasses } from '@/Helpers/classHelper'


export default function Navbar({className})
{
	const classes = makeClasses("flex h-[5rem] mx-[13%]", className);

	return (
		<div className={classes}> 
			<a href="#infopanel">
				<div className="navbar-link navbar-link__active">
					<span className="m-auto font-bold">Infopanel</span>
				</div>
			</a>
			<a href="#appointments">
				<div className="navbar-link">
					<span className="m-auto font-bold">Appointments</span>
				</div>
			</a>
			<a href="#check-ins">
				<div className="navbar-link">
					<span className="m-auto font-bold">Check ins</span>
				</div>
			</a>
			<a href="#offices">
				<div className="navbar-link">
					<span className="m-auto font-bold">Offices</span>
				</div>
			</a>
			<a href="#reviews">
				<div className="navbar-link">
					<span className="m-auto font-bold">Reviews</span>
				</div>
			</a>
		</div>
	)
}