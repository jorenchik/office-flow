import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateEmailForm from "./Partials/UpdateEmailForm"
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import {InfoModalProvider, PromptModalProvider} from '@/Components/Modal/ModalContext';
import {LocaleContextProvider} from "@/Components/Locale/LocaleContext";
import ContentFrame from "@/Layouts/ContentFrame";
import SectionHeading from "@/Components/Typography/SectionHeading";
import { Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default function Edit({
    locale,
    localeEntries,
    auth,
    mustVerifyEmail,
    status
}) {
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
                            <SectionHeading children={
                                localeEntries['editProfile']
                            }/>
                            <div className="grid grid-cols-2 py-12">
                                <div className="p-12">
                                    <UpdateProfileInformationForm/>
                                </div>
                                <div className="flex flex-wrap space-y-12 p-12">
                                    <UpdatePasswordForm/>
                                </div>
                            </div>
                            <div className='flex justify-end space-x-4'
                                actions={
                                    []
                            }>
                                <Link href={
                                    route('profile.view')
                                }>
                                    <SecondaryButton>{
                                        localeEntries['back']
                                    }</SecondaryButton>
                                </Link>
                            </div>
                        </ContentFrame>
                    </AuthenticatedLayout>
                </LocaleContextProvider>
            </PromptModalProvider>
        </InfoModalProvider>
    );
}
