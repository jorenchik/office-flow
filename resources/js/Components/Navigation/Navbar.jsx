import { makeClasses } from "@/Helpers/classHelper";
import { Link } from "@inertiajs/react";
import { useLocale, useLocaleEntries } from "../Locale/LocaleContext";
import { useEffect } from "react";

export default function Navbar({ className, activeElement }) {
    const locale = useLocale();
    const localeEntries = useLocaleEntries();
    const classes = makeClasses("flex h-[5rem]", className);
    let elements;
    
    function setElements() {
        elements = [
        [localeEntries['dashboard'], route("dashboard")],
        [localeEntries['appointments'], route("appointments")],
        [localeEntries['checkIns'], route("checkin")],
        [localeEntries['offices'], route("offices")],
        [localeEntries['reviews'], route("reviews")]];
    }

    setElements();
    
    let items = [];
    let itemKey = 0;

    return (
        <div className={classes}>
            {elements.map((el) => {
                ++itemKey;
                return (
                    <Link href={el[1]} key={itemKey} method="get" as="button">
                        {el[0] === activeElement ? (
                            <div className="navbar-link navbar-link__active">
                                <span className="m-auto font-bold">
                                    {el[0]}
                                </span>
                            </div>
                        ) : (
                            <div className="navbar-link">
                                <span className="m-auto font-bold">
                                    {el[0]}
                                </span>
                            </div>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
