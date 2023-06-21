
import HeaderLink from '@/Components/HeaderLink'
import ApplicationLogo from './ApplicationLogo'
import { useForm } from '@inertiajs/react';


export default function Header({user})
{

	const { post} = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

	return (
		<div className='w-full flex justify-between px-[13%] bg-slate-100 overflow-hidden clear-fix'>
			<div id="header-logo-container" className='flex items-center my-auto h-full justify-centerplace-content-center'>
				<ApplicationLogo className="w-[15rem] m-5 shadow-none rounded-xl" />
			</div>
			<div id="header-links" className="flex mr-4 auto">
				<div className="flex justify-center items-center p-2 py-1 space-x-10">
					<HeaderLink href="#about">
						About
					</HeaderLink>
					<HeaderLink href="#contacts">
						Contacts
					</HeaderLink>
					<HeaderLink href="#help">
						Help
					</HeaderLink>
					<HeaderLink className="!text-slate-600" href="#account">
						Account
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