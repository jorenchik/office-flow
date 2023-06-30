import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentFrame from "@/Layouts/ContentFrame";
import SectionHeading from "@/Components/Typography/SectionHeading";
import {LocaleContextProvider} from "@/Components/Locale/LocaleContext";
import {InfoModalProvider} from "@/Components/Modal/ModalContext";
import {PromptModalProvider} from "@/Components/Modal/ModalContext";

export default function About({locale, localeEntries, auth}) {
    return (
        <InfoModalProvider>
            <PromptModalProvider>
                <LocaleContextProvider initialLocale={locale}
                    initialLocaleEntries={localeEntries}>
                    <AuthenticatedLayout localeEntries={localeEntries}
                        locale={locale}
                        user={
                            auth.user
                    }>
                        <ContentFrame className="mt-5">
                            <SectionHeading children={
                                localeEntries['about']
                            }/>
                            <div className="grid grid-cols-2">
                                <ParagraphBox>
                                    <ParagraphHeading>
                                        {localeEntries['welcome']}

                                    </ParagraphHeading>
                                    <Paragraph>
                                        {localeEntries['welcomeParagraph']}
                                    </Paragraph>
                                </ParagraphBox>
                                <ParagraphBox>
                                    <ParagraphHeading>

                                        {localeEntries['whyUs']}
                                    </ParagraphHeading>
                                    <Paragraph>
                                        {localeEntries['whyUsParagraph']}
                                    </Paragraph>
                                </ParagraphBox>
                                <ParagraphBox>
                                    <ParagraphHeading>
                                        {localeEntries['pauseMonitoring']}
                                    </ParagraphHeading>
                                    <Paragraph>
                                        {localeEntries['pauseMonitoringParagraph']}
                                    </Paragraph>
                                </ParagraphBox>
                                <ParagraphBox>
                                    <ParagraphHeading>
                                        {localeEntries['comprehensiveAnalytics']}
                                    </ParagraphHeading>
                                    <Paragraph>
                                        {localeEntries['comprehensiveAnalyticsParagraph']}
                                    </Paragraph>
                                </ParagraphBox>
                            </div>
                        </ContentFrame>
                    </AuthenticatedLayout>
                </LocaleContextProvider>
            </PromptModalProvider>
        </InfoModalProvider>
    );
}

function ParagraphBox({children}) {
    return (
        <div className="mt-10 p-6">
            {children} </div>
    )
}

function ParagraphHeading({children}) {
    return (
        <h2 className="text-3xl font-light my-10">
            {children} </h2>
    )
}

function Paragraph({children}) {
    return (
        <p className="text-lg text-justify">
            {children} </p>
    )
}
