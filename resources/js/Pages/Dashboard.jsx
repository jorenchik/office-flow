import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Indicator from "@/Components/Info/Indicator";
import Infopanel from "@/Components/Info/Infopanel";
import SectionHeading from "@/Components/Typography/SectionHeading";
import SectionRow from "@/Components/PageStructure/SectionRow";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";
import { LocaleContextProvider } from "@/Components/Locale/LocaleContext";
import { InfoModalProvider, PromptModalProvider } from "@/Components/Modal/ModalContext";

export default function Dashboard({ weekDay, now, locale, localeEntries, auth, timeAtWork, lastRegistered, infoPanels }) {
    return (
        <LocaleContextProvider initialLocale={locale} initialLocaleEntries={localeEntries} >
        <InfoModalProvider>
        <PromptModalProvider>
            <AuthenticatedLayout localeEntries={localeEntries} locale={locale} user={auth.user}>
                <Navbar activeElement={localeEntries['dashboard']} className="mt-14" />
                <ContentFrame>
                    <SectionHeading>{localeEntries['overview']}</SectionHeading>
                    <div className="flex flex-grow justify-center items-center">
                        <div className="flex flex-wrap">
                            <SectionRow className='mt-14'>
                                <Infopanel>
                                    <span className="w-full text-5xl font-light text-slate-700">
                                        {now}
                                    </span>
                                    <span className="w-full text-2xl font-light text-slate-600">
                                        {localeEntries[weekDay]}
                                    </span>
                                </Infopanel>
                                <Infopanel>
                                    <span className="w-full text-5xl font-light text-slate-700">
                                        {timeAtWork} {localeEntries['in']}
                                    </span>
                                    <span className="w-full text-2xl font-light text-slate-600">
                                        {localeEntries['checkedIn']} {localeEntries['at']} {lastRegistered}
                                    </span>
                                </Infopanel>
                            </SectionRow>
                            <SectionRow className='flex-wrap mt-10 space-x-12'>
                                {
                                    infoPanels.map((infoPanel, index) => {
                                        return (
                                            <Indicator
                                                key={index}
                                                number={infoPanel.number}
                                                className='mt-10'
                                                changePercent={infoPanel.changePercent}
                                                text={infoPanel.text}
                                            />
                                        )
                                    })
                                }
                            </SectionRow>
                        </div>
                    </div>
                </ContentFrame>
            </AuthenticatedLayout>
            </PromptModalProvider>
            </InfoModalProvider>
        </LocaleContextProvider>
    );
}
