import {HeaderLink} from "./HeaderLink";

export function ButtonLink({className, children}) {
    return (
        <HeaderLink className={
                `!text-gray-700 ${className}`
            }
            isButton={true}
            type="submit">
            {children} </HeaderLink>
    );
}
