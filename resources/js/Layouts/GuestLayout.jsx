import { useLocaleEntriesUpdate, useLocaleUpdate } from "@/Components/Locale/LocaleContext";
import ApplicationLogo from "@/Components/Logo/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import Dropdown from "@/Components/Header/Dropdown";
import { LanguagePicker } from "@/Components/Locale/LanguagePicker";

export default function Guest({ locale, localeEntries, children }) {
    const setLocaleEntries = useLocaleEntriesUpdate();
    const setLocale = useLocaleUpdate();

    useEffect(() => {
        setLocale(locale);
        setLocaleEntries(localeEntries);
    }, [locale]);

    return (
        <div className="flex flex-col items-center pt-6 min-h-screen bg-gray-100 sm:justify-center sm:pt-0">
            <div>
                <Link
                    href="/"
                    className="flex justify-center place-items-center"
                >
                    <ApplicationLogo className="w-[80%] rounded-xl" />
                </Link>
            </div>

            <div className="overflow-visible px-6 py-4 mt-6 w-full bg-white shadow-md sm:max-w-lg sm:rounded-xl">
                {children}
                <Dropdown>
                    <LanguagePicker/>
                </Dropdown>
            </div>
        </div>
    );
}
