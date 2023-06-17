
export default function SectionRow({children, ...props})
{
	return (
		<div className="flex mt-20 justify-around h-[14rem] w-full">
			{children}
		</div>
	);
}