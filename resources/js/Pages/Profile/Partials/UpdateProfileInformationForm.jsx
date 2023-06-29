import InputError from "@/Components/Errors/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useLocaleEntries } from "@/Components/Locale/LocaleContext";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const localeEntries = useLocaleEntries();

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            work_phone_number: user.work_phone_number,
            email: user.email,
            image: user.image
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {localeEntries['profileInformation']}
                                    </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {localeEntries['updateProfileDescription']}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="block mt-1 w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        className="block mt-1 w-full"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        required
                        autoComplete="family-name"
                    />

                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <TextInput
                        id="phone_number"
                        className="block mt-1 w-full"
                        value={data.phone_number}
                        onChange={(e) => setData("phone_number", e.target.value)}
                        required
                        autoComplete="tel"
                    />

                    <InputError className="mt-2" message={errors.phone_number} />
                </div>

                <div>
                    <InputLabel htmlFor="work_phone_number" value="Work Phone Number" />

                    <TextInput
                        id="work_phone_number"
                        className="block mt-1 w-full"
                        value={data.work_phone_number}
                        onChange={(e) => setData("work_phone_number", e.target.value)}
                        autoComplete="tel"
                    />

                    <InputError className="mt-2" message={errors.work_phone_number} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="block mt-1 w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                        <InputLabel htmlFor="image" value={localeEntries['profilePicture']}/>
                        <input id="image" className="mt-2" type="file" name="image" 
                            onChange={e => setData('image', e.target.files[0])} />
                        <InputError className='mt-2' message={errors['image']} />
                </div>

                <div className="flex gap-4 items-center">
                    <PrimaryButton disabled={processing}>{localeEntries['save']}</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
