import {HeaderLink} from "./HeaderLink";

export function ButtonLink({className, children}) {
    return (
        <HeaderLink className={
                `${className}`
            }
            isButton={true}
            type="submit">
            {children} </HeaderLink>
    );
}
