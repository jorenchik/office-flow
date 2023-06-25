import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentFrame from "@/Layouts/ContentFrame";
import SectionHeading from "@/Components/Typography/SectionHeading";
import { LocaleContextProvider } from "@/Components/Locale/LocaleContext";

export default function Contacts({ locale, localeEntries, auth }) {
    return (
        <LocaleContextProvider initialLocale={locale} initialLocaleEntries={localeEntries} >
            <AuthenticatedLayout localeEntries={localeEntries} locale={locale} user={auth.user}>
                <ContentFrame className="mt-5">
                    <SectionHeading children={localeEntries['contacts']} />
                </ContentFrame>
            </AuthenticatedLayout>
        </LocaleContextProvider>
    );
}
