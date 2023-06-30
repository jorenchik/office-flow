import {makeClasses} from "@/Helpers/classHelper";
import {Link} from "@inertiajs/react";
import {useLocale, useLocaleEntries} from "../Locale/LocaleContext";
import { usePage } from "@inertiajs/react";

export default function Navbar({ className, activeElement}) {
    const locale = useLocale();
    const localeEntries = useLocaleEntries();
    const classes = makeClasses("flex h-[5rem]", className);
    let elements;
    const { auth } = usePage().props;
    const userRole = auth.role;

    function setElements() {
        if (userRole.name === 'employee')
        {
            elements = [
                [localeEntries["dashboard"], route('dashboard')],
                [localeEntries["appointments.index"], route('appointments.index')],
                [localeEntries["checkin.index"], route('checkin.index')],
                [localeEntries["offices.index"], route('offices.index')],
            ];
        } else if (userRole.name === 'user') {
            elements = [
                [localeEntries["appointments.index"], route('appointments.index')],
                [localeEntries["offices.index"], route('offices.index')],
            ]    
        } else if (userRole.name === 'admin') {
            elements = [
                [localeEntries["appointments.index"], route('appointments.index')],
                [localeEntries["checkins.index"], route('checkin.index')],
                [localeEntries["offices.index"], route('offices.index')],
            ];
        }
    }

    setElements();

    let items = [];
    let itemKey = 0;

    return (
        <div className={classes}>
            {elements.map((el) => {
                ++itemKey;
                return (
                    <Link href={
                            el[1]
                        }
                        key={itemKey}
                        method="get"
                        as="button"
                        preserveScroll>
                        <div className={
                            `flex w-52 h-full text-xl uppercase  border-r-2 transition-all duration-75 border-r-slate-300 ${
                                el[0] == activeElement ? 'bg-cyan-700 text-white' : 'text-gray-500 bg-slate-200'
                            }`
                        }>
                            <span className="m-auto font-bold">
                                    {el[0]}
                                </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
