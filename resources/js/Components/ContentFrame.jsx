
export default function ContentFrame({children, ...props})
{
	return (
		<div className='flex mx-[13%] overflow-hidden flex-wrap mt-14 px-10 py-20 w-full bg-white shadow-lg'>
			{children}
		</div>
	);
}