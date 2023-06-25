import Dropdown, { useDropdown } from "../Header/Dropdown";
import { useLocale, useLocaleEntries } from "./LocaleContext";
import { ButtonLink } from "../Links/ButtonLink";
import { router } from "@inertiajs/react";

export function LanguagePicker({ children }) {
    const locale = useLocale();
    const localeEntries = useLocaleEntries();
    const {open, setOpen, toggleOpen} = useDropdown();

    function handleChange(e) {
        e.preventDefault();
        toggleOpen();
        const newLocale = e.target.getAttribute("value");
        router.post(route("locale.set"), {
            locale: newLocale,
        });
    }

    return (
        <div>
                <Dropdown.Trigger>
                    <ButtonLink>{localeEntries[locale]}</ButtonLink>
                </Dropdown.Trigger>

                <Dropdown.Content align="left" width="48">
                    {locale != "lv" ? (
                        <Dropdown.Link onClick={handleChange} value="lv">
                            Latviešu
                        </Dropdown.Link>
                    ) : (
                        ""
                    )}
                    {locale != "en" ? (
                        <Dropdown.Link onClick={handleChange} value='en'>
                            English
                        </Dropdown.Link>
                    ) : (
                        ""
                    )}
                </Dropdown.Content>
        </div>
    );
}
