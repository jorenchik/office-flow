import Navbar from '@/Components/Navbar'

export default function ContentFrame({children, activeNavbarElement})
{
	return (
		<div className='flex flex-col flex-grow items-center place-content-center w-full'>
			<Navbar className='mt-14' activeElement={activeNavbarElement} />
			<div className='flex overflow-hidden flex-wrap flex-grow px-10 py-20 mt-14 w-full bg-white shadow-lg'>
				{children}
			</div>
		</div>
	);
}