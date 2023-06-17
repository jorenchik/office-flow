
import HeaderLink from '@/Components/HeaderLink'
import ApplicationLogo from './ApplicationLogo'
import { makeClasses } from '@/Helpers/classHelper'


export default function Footer({className})
{
	const classes = makeClasses("w-full h-16 bg-cyan-700", className);

	return (
		<footer className={classes}>
			<div className='h-16 w-full bg-cyan-700 flex justify-between px-[13%]'>
					<div id="header-links" className="flex mr-4">
						<div className="p-2 py-1 my-auto space-x-4">
							<a className="footer__link">Contacts</a>
							<a className="footer__link">About</a>
							<a className="footer__link">Help</a>
							<a className="footer__link !text-gray-100">Logout</a>
						</div>
					</div>
				</div>
		</footer>
	)
}