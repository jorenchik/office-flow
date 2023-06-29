import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {LocaleContextProvider} from "@/Components/Locale/LocaleContext";
import {PromptModalProvider} from "@/Components/Modal/ModalContext";
import {InfoModalProvider} from "@/Components/Modal/ModalContext";
import React from 'react';
import {usePage} from '@inertiajs/react';
import ContentFrame from "@/Layouts/ContentFrame";
import SectionHeading from "@/Components/Typography/SectionHeading";
import {Link} from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";

export default function ViewProfileInformation({
    auth,
    localeEntries,
    locale,
	role,
    image,
    className = ""
}) {
    const user = usePage().props.auth.user;

    return (
        <InfoModalProvider>
            <PromptModalProvider>
                <LocaleContextProvider initialLocale={locale}
                    initialLocaleEntries={localeEntries}>
                    <AuthenticatedLayout user={
                            auth.user
                        }
                        localeEntries={localeEntries}
                        locale={locale}
                    >
                        <ContentFrame>

                            <SectionHeading>
								{localeEntries['profileInformation']}
                            </SectionHeading>
                            <div className="flex flex-grow mt-10">
                                <div className="flex justify-center items-center w-1/3">
                                    <div className="flex justify-center flex-wrap items-center p-8">
                                        <div className="w-[55%] rounded-3xl overflow-hidden">
                                            {
                                            image && (
                                                <img src={image}
                                                    alt=""/>
                                            )
                                        } </div>
                                        <div className="mt-5 text-center w-full text-2xl">
											{localeEntries['yourPhoto']}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 grid-rows-3 w-2/3">
                                    <div className="flex flex-col items-center justify-center p-8">
                                        <h2 className="text-2xl w-full text-center">{localeEntries['name']}</h2>
                                        <div className="mt-5 w-full text-slate-600 text-center text-xl">
                                            {
                                            user.name
                                        }</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-8">
                                        <h2 className="text-2xl w-full text-center">{localeEntries['lastName']}</h2>
                                        <div className="mt-5 w-full text-slate-600 text-center text-xl">
                                            {
                                            user.last_name
                                        }</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-8">
                                        <h2 className="text-2xl w-full text-center">{localeEntries['phoneNumber']}</h2>
                                        <div className="mt-5 w-full text-slate-600 text-center text-xl">
                                            {
                                            user.phone_number
                                        }</div>
                                    </div>
                                    { role === 'employee' ? <div className="flex flex-col items-center justify-center p-8">
                                        <h2 className="text-2xl w-full text-center">{localeEntries['workPhoneNumber']}</h2>
                                        <div className="mt-5 w-full text-slate-600 text-center text-xl">
                                            {
                                            user.work_phone_number
                                        }</div>
                                    </div> : '' }
                                    <div className="flex flex-col items-center justify-center p-8">
                                        <h2 className="text-2xl w-full text-center">{localeEntries['email']}</h2>
                                        <div className="mt-5 w-full text-slate-600 text-center text-xl">
                                            {
                                            user.email
                                        }</div>
                                    </div>
                                </div>
                            </div>
                        <div className='flex justify-end space-x-4' actions={[]}>
                            <Link href={route('profile.edit')}>
                                <PrimaryButton type='submit'>{localeEntries['edit']}</PrimaryButton>
                            </Link>
                        </div>
                        </ContentFrame>
                    </AuthenticatedLayout>
                </LocaleContextProvider>
            </PromptModalProvider>
        </InfoModalProvider>
    );
}
