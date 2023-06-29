import {useEffect} from "react";
import Checkbox from "@/Components/Form/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Errors/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import {Head, Link, useForm} from "@inertiajs/react";
import {LocaleContextProvider} from "@/Components/Locale/LocaleContext";

export default function Login({locale, localeEntries, status, canResetPassword}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({email: "", password: "", remember: false});

    useEffect(() => {
        return() => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("user.login"));
    };
    return (
        <LocaleContextProvider initialLocale={locale}
            initialLocaleEntries={localeEntries}>
            <GuestLayout locale={locale}
                localeEntries={localeEntries}>
                <Head title="Log in"/> {
                status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status} </div>
                )
            }

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email"
                            value={
                                localeEntries['email']
                            }/>

                        <TextInput id="email" type="email" name="email"
                            value={
                                data.email
                            }
                            className="block mt-1 w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={
                                (e) => setData("email", e.target.value)
                            }/>

                        <InputError message={
                                errors.email
                            }
                            className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password"
                            value={
                                localeEntries['password']
                            }/>

                        <TextInput id="password" type="password" name="password"
                            value={
                                data.password
                            }
                            className="block mt-1 w-full"
                            autoComplete="current-password"
                            onChange={
                                (e) => setData("password", e.target.value)
                            }/>

                        <InputError message={
                                errors.password
                            }
                            className="mt-2"/>
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox name="remember"
                                checked={
                                    data.remember
                                }
                                onChange={
                                    (e) => setData("remember", e.target.checked)
                                }/>
                            <span className="ml-2 text-sm text-gray-600">
                                {
                                localeEntries['rememberMe']
                            } </span>
                        </label>
                    </div>

                    <div className="flex justify-end items-center mt-4">
                        {
                        canResetPassword && (
                            <Link href={
                                    route("password.request")
                                }
                                className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {
                                localeEntries['forgotPassword?']
                            } </Link>
                        )
                    }

                        <Link href={
                                route("register")
                            }
                            className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {
                            localeEntries['newHere?']
                        } </Link>

                        <PrimaryButton className="ml-4"
                            disabled={processing}>
                            {localeEntries['login']}
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </LocaleContextProvider>
    );
}
