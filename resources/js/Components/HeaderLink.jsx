import { Link } from "@inertiajs/react"
import { makeClasses } from "@/Helpers/classHelper"
import { useState } from "react";

export default function HeaderLink({className, children,isButton})
{
	let classes = makeClasses("font-semibold text-slate-500 uppercase", className);

	return (
		<div>
			{isButton ?
				<button className={classes} type='submit'> {children} </button>
			: <Link className={classes}> {children} </Link> }
		</div>
	);
}