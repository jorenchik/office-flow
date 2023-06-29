import ApplicationLogo from "../Logo/ApplicationLogo";
import { makeClasses } from "@/Helpers/classHelper";
import { FooterLink } from "../Links/FooterLink";
import { useForm } from "@inertiajs/react";
import { useLocaleEntries } from "../Locale/LocaleContext";

export default function Footer({ className }) {
    const localeEntries = useLocaleEntries();
    const classes = makeClasses("w-full h-16 bg-cyan-700", className);

    const { post } = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    return (
        <footer className={classes}>
            <div className="flex h-16 mt-14 w-full bg-cyan-700 px-[13%]">
                <div id="header-links" className="flex justify-between w-full mr-4">
                    <div className="flex p-2 py-1 my-auto space-x-4">
                        <FooterLink href={route("about")}>
                            {localeEntries["about"]}
                        </FooterLink>
                        <FooterLink href={route("contacts")}>
                            {localeEntries["contacts"]}{" "}
                        </FooterLink>
                        <FooterLink href={route("help")}>
                            {localeEntries["help"]}
                        </FooterLink>
                        <FooterLink href={route("profile.view")}>
                            {localeEntries["profile"]}
                        </FooterLink>
                    </div>
                    <div className="flex p-2 py-1 my-auto">
                        <form onSubmit={submit}>
                            <FooterLink isButton={true} type="submit">
                                {localeEntries["logout"]}{" "}
                            </FooterLink>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}
