import { Link } from "@inertiajs/react"
import { makeClasses } from "@/Helpers/classHelper"
import { useState } from "react";

function FooterLink({className, children, href, isButton})
{
	let classes = makeClasses("font-semibold text-slate-100 uppercase", className);

	return (
		<div>
			{isButton ?
				<button className={classes} type='submit'> {children} </button>
			: <Link className={classes} href={href}> {children} </Link> }
		</div>
	);
}

function HeaderLink({className, children, href, isButton})
{
	let classes = makeClasses("font-semibold text-slate-500 uppercase", className);

	return (
		<div>
			{isButton ?
				<button className={classes} type='submit'> {children} </button>
			: <Link className={classes} href={href}> {children} </Link> }
		</div>
	);
}

export {FooterLink, HeaderLink}