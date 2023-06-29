import { useLocaleEntries } from "../Locale/LocaleContext";

export default function Indicator({number, changePercent, text, className}) {

    const localeEntries = useLocaleEntries();
    return (
        <div className={
            `flex flex-wrap items-center p-4 bg-white rounded-lg shadow w-[16rem] h-[11rem] sm:p-6 xl:p-8 ${className}`
        }>
            <div className="flex w-full">
                <div className="flex-shrink-0">
                    <span className="text-2xl font-bold leading-none text-gray-600 sm:text-3xl">
                        {number} </span>
                </div>
            </div>
            <h3 className="text-base font-normal text-gray-500">
               {localeEntries[text]} </h3>
        </div>
    );
}
