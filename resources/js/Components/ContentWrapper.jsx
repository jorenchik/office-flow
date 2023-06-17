
export default function ContentWrapper({children, ...props})
{
	return (
		<div className='flex flex-wrap justify-center items-center'>
			{children}
		</div>
	);
}