import {useEffect} from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Errors/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import {Head, useForm} from "@inertiajs/react";

export default function ConfirmPassword() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({password: ""});

    useEffect(() => {
        return() => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password"/>

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                                password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password"/>

                    <TextInput id="password" type="password" name="password"
                        value={
                            data.password
                        }
                        className="block mt-1 w-full"
                        isFocused={true}
                        onChange={
                            (e) => setData("password", e.target.value)
                        }/>

                    <InputError message={
                            errors.password
                        }
                        className="mt-2"/>
                </div>

                <div className="flex justify-end items-center mt-4">
                    <PrimaryButton className="ml-4"
                        disabled={processing}>
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
