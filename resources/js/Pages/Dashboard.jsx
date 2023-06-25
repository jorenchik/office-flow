import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Indicator from "@/Components/Info/Indicator";
import Infopanel from "@/Components/Info/Infopanel";
import SectionHeading from "@/Components/Typography/SectionHeading";
import VLine from "@/Components/PageStructure/VerticalLine";
import SectionRow from "@/Components/PageStructure/SectionRow";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";
import { LocaleContextProvider } from "@/Components/Locale/LocaleContext";

export default function Dashboard({ locale, localeEntries, auth }) {
    return (
        <LocaleContextProvider initialLocale={locale} initialLocaleEntries={localeEntries} >
            <AuthenticatedLayout localeEntries={localeEntries} locale={locale} user={auth.user}>
                <Navbar activeElement={localeEntries['dashboard']} className="mt-14" />
                <ContentFrame>
                    <SectionHeading>{localeEntries['overview']}</SectionHeading>
                    <div className="flex flex-grow justify-center items-center">
                        <div className="flex flex-wrap">
                            <SectionRow className='mt-14'>
                                <Infopanel>
                                    <span className="w-full text-5xl font-light text-slate-700">
                                        12:25
                                    </span>
                                    <span className="w-full text-2xl font-light text-slate-600">
                                        6th June, 2023
                                    </span>
                                </Infopanel>
                                <VLine />
                                <Infopanel>
                                    <span className="w-full text-5xl font-light text-slate-700">
                                        8 {localeEntries['hours']} 12 {localeEntries['minutes']} {localeEntries['in']}
                                    </span>
                                    <span className="w-full text-2xl font-light text-slate-600">
                                        {localeEntries['checkedIn']} {localeEntries['at']} 8:13
                                    </span>
                                </Infopanel>
                            </SectionRow>
                            <SectionRow className='flex-wrap mt-10 space-x-12'>
                                {
                                    [1, 2, 3, 4, 5].map((el) => {
                                        return (
                                            <Indicator
                                                key={el}
                                                number={22}
                                                className='mt-10'
                                                changePercent={2.6}
                                                text="Appointments in June"
                                            />
                                        )
                                    })
                                }
                            </SectionRow>
                        </div>
                    </div>
                </ContentFrame>
            </AuthenticatedLayout>
        </LocaleContextProvider>
    );
}
