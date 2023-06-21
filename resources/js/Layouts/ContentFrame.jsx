import Navbar from '@/Components/Navbar'

export default function ContentFrame({children, activeNavbarElement})
{
	return (
		<div className='flex flex-wrap place-content-center w-full'>
			<Navbar className='mt-14' activeElement={activeNavbarElement} />
			<div className='flex mx-[13%] w-full overflow-hidden flex-wrap mt-14 px-10 py-20 bg-white shadow-lg'>
				{children}
			</div>
		</div>
	);
}