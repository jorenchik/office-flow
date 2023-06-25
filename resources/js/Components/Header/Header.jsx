import { HeaderLink } from "../Links/HeaderLink";
import ApplicationLogo from "../Logo/ApplicationLogo";
import { Link, useForm } from "@inertiajs/react";
import { LanguagePicker } from "../Locale/LanguagePicker";
import { ButtonLink } from "../Links/ButtonLink";
import Dropdown from "./Dropdown";
import { useLocale, useLocaleEntries } from "../Locale/LocaleContext";

export default function Header({ user, className }) {
    const { post } = useForm();
    const locale = useLocale();
    const localeEntries = useLocaleEntries();
    const submit = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    return (
        <div className="w-full flex justify-between px-[13%] bg-slate-100">
            <div className="flex items-center my-auto h-full justify-centerplace-content-center">
                <Link href={route("dashboard")}>
                    <ApplicationLogo className="w-[15rem] m-5 rounded-xl" />
                </Link>
            </div>
            <div className="flex mr-4 auto">
                <div className="flex justify-center items-center p-2 py-1 space-x-10">
                    <HeaderLink href={route("about")}> {localeEntries['about']} </HeaderLink>
                    <HeaderLink href={route("contacts")}> {localeEntries['contacts']} </HeaderLink>
                    <HeaderLink href={route("help")}> {localeEntries['help']} </HeaderLink>
                    <HeaderLink href={route("account")}> {localeEntries['account']} </HeaderLink>
                    <Dropdown>
                        <LanguagePicker/>
                    </Dropdown>
                    <form onSubmit={submit}>
                        <ButtonLink>{localeEntries['logout']}</ButtonLink>
                    </form>
                </div>
            </div>
        </div>
    );
}
