import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import ContentWrapper from "@/Layouts/ContentWrapper";
import { useLocaleEntriesUpdate, useLocaleUpdate } from "@/Components/Locale/LocaleContext";
import { useEffect, useState } from "react";
import {_} from 'lodash'

export default function Authenticated({ localeEntries, locale, user, children, }) {
    const setLocaleEntries = useLocaleEntriesUpdate();
    const setLocale = useLocaleUpdate();
   
    useEffect(() => {
        setLocale(locale);
        setLocaleEntries(localeEntries);
    }, [locale]);

    return (
        <div>
                <div className="flex flex-col min-h-screen bg-gray-50">
                    <Header user={user} />
                    <ContentWrapper className="flex-grow">
                        {children}
                    </ContentWrapper>
                </div>
                <Footer />
        </div>
    );
}
