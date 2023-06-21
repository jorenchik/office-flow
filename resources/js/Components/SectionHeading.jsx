export default function SectionHeading({children, ...props})
{
	return (
		<h1 className='ml-10 text-5xl font-light'>
			{children}
		</h1>
	);
}