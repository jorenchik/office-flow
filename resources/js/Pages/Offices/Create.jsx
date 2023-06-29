import React from 'react';
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";
import TextInput from "@/Components/Form/TextInput";
import InputLabel from "@/Components/Form/InputLabel";
import InputError from "@/Components/Errors/InputError";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import { Link } from '@inertiajs/react';
import { ActionButtons } from "@/Components/Form/ActionButtons";
import { LocaleContextProvider } from "@/Components/Locale/LocaleContext";
import { useState } from 'react';

export default function CreateOffice({ departments, title, localeEntries, locale, auth, actions }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        presenting_ability: false,
        capacity: 0,
        employee_using_possibility: false,
        workplace_count: 0,
        department_id: undefined
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        post(route("offices.store"), formData, {
            onSuccess: () => reset(),
        });
    };


    return (
        <LocaleContextProvider initialLocale={locale} initialLocaleEntries={localeEntries}>
            <AuthenticatedLayout locale={locale} localeEntries={localeEntries} user={auth.user}>
                <Navbar activeElement={localeEntries['offices.index']} className="mt-14" />
                <ContentFrame className='flex flex-col'>
                    <SectionHeading>{localeEntries['createOffice']}</SectionHeading>
                    <form onSubmit={handleSubmit} className='flex flex-col flex-grow'>
                        <div className="flex-grow">
                            <div className="grid grid-cols-2 px-10 mt-10 w-full">
                                <div className="p-8 text-slate-600">
                                    <InputLabel className='mb-5 !text-2xl' htmlFor="capacity" value={localeEntries['offices.capacity']} />
                                    <InputError message={errors['capacity']} className="my-2" />
                                    <TextInput id="capacity" className="block w-full" type="number" name="capacity" value={data.capacity}
                                        onChange={e => setData('capacity', e.target.value)} autoComplete="capacity" required />
                                </div>
                                <div className="p-8 text-slate-600">
                                    <InputLabel className='mb-5 !text-2xl' htmlFor="workplace_count" value={localeEntries['offices.workplace_count']} />
                                    <InputError message={errors['workplace_count']} className="my-2" />
                                    <TextInput id="workplace_count" className="block w-full" type="number" name="workplace_count" value={data.workplace_count}
                                        onChange={e => setData('workplace_count', e.target.value)} autoComplete="workplace_count" required />
                                </div>
                                <div className="p-8 text-slate-600">
                                    <InputLabel className='mb-5 !text-2xl' htmlFor="department" value={localeEntries['offices.department']}/>
                                    <InputError message={errors['department_id']} className="my-2" />
                                    <select id="department" name="department_id" value={data.department_id} onChange={e => setData('department_id', e.target.value)}>
                                        <option value=""></option>
                                        {departments.map(department => (
                                            <option key={department.id} value={department.id}>{department.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="p-8 text-slate-600">
                                    <InputLabel className='mb-5 !text-2xl' htmlFor="presenting_ability" value={localeEntries['offices.presenting_ability']}/>
                                    <InputError message={errors['presenting_ability']} className="my-2" />
                                    <input type="checkbox" id="presenting_ability" name="presenting_ability" value={data.presenting_ability} onChange={e => setData('presenting_ability', e.target.checked)} />
                                </div>
                                <div className="p-8 text-slate-600">
                                    <InputLabel className='mb-5 !text-2xl' htmlFor="employee_using_possibility" value={localeEntries['offices.employee_using_possibility']}/>
                                    <InputError message={errors['employee_using_possibility']} className="my-2" />
                                    <input type="checkbox" id="employee_using_possibility" name="employee_using_possibility" value={data.employee_using_possibility} onChange={e => setData('employee_using_possibility', e.target.checked)} />
                                </div>
                                <div className="p-8 text-slate-600">
                                    <InputLabel className='mb-5 !text-2xl' htmlFor="image" value={localeEntries['officeImage']}/>
                                    <InputError message={errors['image']} className="my-2" />
                                    <input id="image" type="file" name="image" 
                                        onChange={e => setData('image', e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end space-x-4' actions={[]}>
                            <Link href={route('offices.index')}>
                                <SecondaryButton>{localeEntries['back']}</SecondaryButton>
                            </Link>
                                <PrimaryButton type='submit'>{localeEntries['save']}</PrimaryButton>
                        </div>
                    </form>
                </ContentFrame>
            </AuthenticatedLayout>
        </LocaleContextProvider>
    );
}
