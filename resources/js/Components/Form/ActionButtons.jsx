import {useLocaleEntries} from "../Locale/LocaleContext";
import {Link} from "@inertiajs/react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

export function ActionButtons({
    actions,
    className = "",
    children,
    ...props
}) {
    const localeEntries = useLocaleEntries();
    return (
        <div className={`flex space-x-6 ${className}`}>
            {
                Object.entries(actions).map(([key, el]) => {
                    return (
                    <Link key={key} href={
                        el['route'] ? el['route'] : '#'
                    }
                    preserveScroll>
                        {
                            el['type'] === 'primary' ? <PrimaryButton className="!bg-cyan-700">
                            <div className="text-xl">
                                {
                                    localeEntries[key]
                                } </div>
                        </PrimaryButton> : <SecondaryButton>
                            <div className="text-xl">
                                {
                                    localeEntries[key]
                                } </div>
                        </SecondaryButton>
                    } </Link>
                    );
                })
            }
            
            {children}
             </div>
    )
}