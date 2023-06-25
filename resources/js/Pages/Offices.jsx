import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";
import { LocaleContextProvider } from "@/Components/Locale/LocaleContext";

export default function Offices({ localeEntries, locale, auth }) {
    return (
        <LocaleContextProvider initialLocale={locale} initialLocaleEntries={localeEntries} >
            <AuthenticatedLayout localeEntries={localeEntries} locale={locale} user={auth.user}>
                <Navbar activeElement={localeEntries['offices']} className="mt-14" />
                <ContentFrame>
                    <SectionHeading>{localeEntries['offices']}</SectionHeading>
                </ContentFrame>
            </AuthenticatedLayout>
        </LocaleContextProvider>
    );
}
