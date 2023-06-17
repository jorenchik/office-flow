import { Link } from "@inertiajs/react"
import { makeClasses } from "@/Helpers/classHelper"
import { useState } from "react";

export default function Header({children, className, isActive, ...props})
{
	const classes = makeClasses("font-semibold text-slate-500 uppercase", className);
	const [active, setActive] = useState(isActive);

	return (
		<Link {...props} className={classes}>
			{children}
		</Link>
	)
}