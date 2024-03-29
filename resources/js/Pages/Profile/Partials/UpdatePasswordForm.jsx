import { useRef } from "react";
import InputError from "@/Components/Errors/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useLocaleEntries } from "@/Components/Locale/LocaleContext";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const localeEntries = useLocaleEntries();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        post(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>

            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {localeEntries['updatePassword']}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {localeEntries['updatePasswordDescription']}
                    
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value={localeEntries['currentPassword']}
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="block mt-1 w-full"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={localeEntries['newPassword']} />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="block mt-1 w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={localeEntries['confirmPassword']}
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="block mt-1 w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex gap-4 items-center">
                    <PrimaryButton disabled={processing}>{localeEntries['save']}</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
