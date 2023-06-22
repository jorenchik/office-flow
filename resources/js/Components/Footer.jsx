
import ApplicationLogo from './ApplicationLogo'
import { makeClasses } from '@/Helpers/classHelper'
import { FooterLink } from './Links';
import { useForm } from '@inertiajs/react';


export default function Footer({className})
{
	const classes = makeClasses("w-full h-16 bg-cyan-700", className);

	const { post} = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

	return (
		<footer className={classes}>
			<div className='h-16 w-full bg-cyan-700 flex justify-between px-[13%]'>
					<div id="header-links" className="flex mr-4">
						<div className="flex p-2 py-1 my-auto space-x-4">
							<FooterLink href={route('about')}>
								About
							</FooterLink>
							<FooterLink href={route('contacts')}>
								Contacts
							</FooterLink>
							<FooterLink href={route('help')}>
								Help
							</FooterLink>
							<FooterLink href={route('account')}>
								Account 
							</FooterLink>
							<form onSubmit={submit}>
								<FooterLink isButton={true} type='submit'>
									Logout
								</FooterLink>
							</form>
						</div>
					</div>
				</div>
		</footer>
	)
}