import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";
import {LocaleContextProvider} from "@/Components/Locale/LocaleContext";
import {ActionButtons} from "@/Components/Form/ActionButtons";
import { InfoModalProvider, PromptModalProvider } from "@/Components/Modal/ModalContext";

export default function View({
    actions,
    attributes,
    localeEntries,
    routeName,
    locale,
    activeNavbarElement,
    auth
}) {

    return (
        <LocaleContextProvider initialLocale={locale}
            initialLocaleEntries={localeEntries}>
            <InfoModalProvider>
            <PromptModalProvider>
            <AuthenticatedLayout locale={locale}
                localeEntries={localeEntries}
                user={
                    auth.user
            }>
                <Navbar activeElement={
                    localeEntries[activeNavbarElement]
                    }
                    className="mt-14"/>
                <ContentFrame className='flex flex-col'>

                    <SectionHeading children={
                        localeEntries[routeName]
                    }/>

                    <div className="flex flex-grow mt-10">
                        <div className="flex justify-center items-center w-1/3">
                            <div className="flex justify-center flex-wrap items-center p-8">
                                <div className="w-[55%] rounded-3xl overflow-hidden">
                                    <img src={
                                            attributes['image']['path']
                                        }
                                        alt=""/>
                                </div>
                                <div className="mt-5 text-center w-full text-2xl">
                                    {
                                    attributes['mainImageCaption']
                                } </div>
                                <div className="mt-5 text-center w-full text-base text-slate-600">
                                    { attributes['detailedImageCaption'] ?
                                    attributes['detailedImageCaption'].map((el, idx) => {
                                        return (
                                            <div key={idx}>
                                                {localeEntries[el] !== undefined ? localeEntries[el] : el} </div>
                                        )
                                    }) : ''
                                } </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 grid-rows-3 w-2/3">
                            {
                            Object.entries(attributes['information']).map(([key, el]) => {
                                return (
                                    <div key={key}
                                        className="flex flex-col items-center justify-center p-8">
                                        <h2 className="text-2xl w-full text-center">
                                            {
                                            localeEntries[key] !== undefined ? localeEntries[key] : key
                                        }</h2>
                                        <div className="mt-5 w-full text-slate-600 text-center text-xl">
                                            { localeEntries[el] !== undefined ? localeEntries[el] : el} </div>
                                    </div>
                                );
                            })
                        } </div>
                    </div>
                    <ActionButtons actions={actions} className="justify-end"/>
                </ContentFrame>
        </AuthenticatedLayout>
        </PromptModalProvider>
        </InfoModalProvider>
        </LocaleContextProvider>
    );
}
