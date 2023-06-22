
import { HeaderLink } from './Links';
import ApplicationLogo from './ApplicationLogo'
import { Link, useForm } from '@inertiajs/react';


export default function Header({user, className})
{

	const { post} = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

	return (
		<div className='w-full flex justify-between px-[13%] bg-slate-100'>
			<div className='flex items-center my-auto h-full justify-centerplace-content-center'>
				<Link href={route('dashboard')}>
					<ApplicationLogo className="w-[15rem] m-5 rounded-xl" />
				</Link>
			</div>
			<div className="flex mr-4 auto">
				<div className="flex justify-center items-center p-2 py-1 space-x-10">
					<HeaderLink href={route('about')}>
						About
					</HeaderLink>
					<HeaderLink href={route('contacts')}>
						Contacts
					</HeaderLink>
					<HeaderLink href={route('help')}>
						Help
					</HeaderLink>
					<HeaderLink href={route('account')}>
						Account ({user.name})
					</HeaderLink>
					<form onSubmit={submit}>
						<HeaderLink className='!text-gray-700' isButton={true} type='submit'>
							Logout
						</HeaderLink>
					</form>
				</div>
			</div>
		</div>
	)
}