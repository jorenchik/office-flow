import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import ContentWrapper from "@/Layouts/ContentWrapper";
import {useLocaleEntriesUpdate, useLocaleUpdate} from "@/Components/Locale/LocaleContext";
import {_} from 'lodash'
import {useEffect} from "react";
import Modal from "@/Components/Modal/Modal";
import { useInfoModal } from "@/Components/Modal/ModalContext";
import { usePage } from "@inertiajs/react";

export default function Authenticated({localeEntries, locale, user, children}) {
    const setLocaleEntries = useLocaleEntriesUpdate();
    const setLocale = useLocaleUpdate();

    useEffect(() => {
        setLocale(locale);
        setLocaleEntries(localeEntries);
    }, [locale]);

    const { 
        handleOpen: openInfo, 
    } = useInfoModal();

    const {flash} = usePage().props; 
    useEffect(() => {
        if(flash['message'])
        {
            openInfo(localeEntries[flash['message']]);
        }
    }, [flash])

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Header user={user}/>
                <Modal type="prompt" /> 
                <Modal type="info" /> 
                <ContentWrapper className="flex-grow">
                    {children} </ContentWrapper>
            </div>
            <Footer/>
        </>
    );
}
