import React, {useEffect} from 'react';
import {useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";
import TextInput from "@/Components/Form/TextInput";
import InputLabel from "@/Components/Form/InputLabel";
import InputError from "@/Components/Errors/InputError";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import {Link} from '@inertiajs/react';
import {LocaleContextProvider} from "@/Components/Locale/LocaleContext";
import DatePicker from "react-datepicker";
import {router} from '@inertiajs/react';
import "react-datepicker/dist/react-datepicker.css";
import {PromptModalProvider, InfoModalProvider} from '@/Components/Modal/ModalContext';


export default function Register({
    chosenDepartmentId,
    chosenOfficeId,
    activeNavbarElement,
    chosenWorkplaceId,
    departments,
    offices,
    workplaces,
    types,
    localeEntries,
    locale,
    auth,
    actions
}) {
    const handleSelectionChange = (e, field) => {
        let onlyField;
        if (field === 'department_id') {
            onlyField = 'offices';
        }
        if (field === 'office_id') {
            onlyField = 'workplaces';
        }
        if (field === 'workplace_id') {
            return;
        }
        router.reload({
            data: {
                [field]: e.target.value
            }
        });
        if (field === 'department_id') {
            setData('workplace_id', 0);
        }
        if(field == 'department_id')
            setData('office_id', 0);
    };

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({
        check_in_time: undefined,
        department_id: chosenDepartmentId || undefined,
        office_id: chosenOfficeId || undefined,
        workplace_id: chosenWorkplaceId || undefined,
        type_id: undefined
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("checkin.store"));
    };

    return (
        <LocaleContextProvider initialLocale={locale}
            initialLocaleEntries={localeEntries}>
            <InfoModalProvider>
                <PromptModalProvider>
                    <AuthenticatedLayout locale={locale}
                        localeEntries={localeEntries}
                        user={
                            auth.user
                    }>
                        <Navbar activeElement={
                            localeEntries[activeNavbarElement]
                            }
                            className="mt-14"/>
                        <ContentFrame className='flex flex-col'>

                            <SectionHeading>{
                                localeEntries['register']
                            }</SectionHeading>
                            <form onSubmit={handleSubmit}
                                className='flex flex-col flex-grow'>

                                <div className="flex-grow">
                                    <div className="grid grid-cols-2 px-10 mt-10 w-full">
                                        {/* Department selection */}
                                        <div className="p-8 text-slate-600">
                                            <InputLabel className='mb-5 !text-2xl' htmlFor="department"
                                                value={
                                                    localeEntries['departments.name']
                                                }/>
                                            <InputError message={
                                                    errors['department_id']
                                                }
                                                className="my-2"/>
                                            <select id="department" name="department_id"
                                                value={
                                                    data.department_id
                                                }
                                                onChange={
                                                    (e) => {
                                                        setData('department_id', e.target.value);
                                                        handleSelectionChange(e, 'department_id');
                                                    }
                                            }>
                                                <option value=""></option>
                                                {
                                                departments.map(department => (
                                                    <option key={
                                                            department.id
                                                        }
                                                        value={
                                                            department.id
                                                    }>
                                                        {
                                                        department.name
                                                    }</option>
                                                ))
                                            } </select>
                                        </div>

                                        {/* Office selection */}
                                        <div className="p-8 text-slate-600">
                                            <InputLabel className='mb-5 !text-2xl' htmlFor="office"
                                                value={
                                                    localeEntries['offices.id']
                                                }/>
                                            <InputError message={
                                                    errors['office_id']
                                                }
                                                className="my-2"/>
                                            <select id="office" name="office_id"
                                                value={
                                                    data.office_id
                                                }
                                                onChange={
                                                    (e) => {
                                                        setData('office_id', e.target.value);
                                                        handleSelectionChange(e, 'office_id');
                                                    }
                                            }>
                                                <option value=""></option>
                                                {
                                                offices.map(office => (
                                                    <option key={
                                                            office.id
                                                        }
                                                        value={
                                                            office.id
                                                    }>
                                                        {
                                                        office.id
                                                    }</option>
                                                ))
                                            } </select>
                                        </div>

                                        {/* Workplace selection */}
                                        <div className="p-8 text-slate-600">
                                            <InputLabel className='mb-5 !text-2xl' htmlFor="workplace"
                                                value={
                                                    localeEntries['workplaces.id']
                                                }/>
                                            <InputError message={
                                                    errors['workplace_id']
                                                }
                                                className="my-2"/>
                                            <select id="workplace" name="workplace_id"
                                                value={
                                                    data.workplace_id
                                                }
                                                onChange={
                                                    (e) => {
                                                        setData('workplace_id', e.target.value);
                                                        handleSelectionChange(e, 'workplace_id');
                                                    }
                                            }>
                                                <option value=""></option>
                                                {
                                                workplaces.map(workplace => (
                                                    <option key={
                                                            workplace.id
                                                        }
                                                        value={
                                                            workplace.id
                                                    }>
                                                        {
                                                        workplace.id
                                                    }</option>
                                                ))
                                            } </select>
                                        </div>
                                        <div className="p-8 text-slate-600">
                                            <InputLabel className='mb-5 !text-2xl' htmlFor="workplace"
                                                value={
                                                    localeEntries['check_in_out_types.name']
                                                }/>
                                            <InputError message={
                                                    errors['check_ins_outs_types.name']
                                                }
                                                className="my-2"/>
                                            <select id="type_id" name="type_id"
                                                value={
                                                    data.type_id
                                                }
                                                onChange={
                                                    (e) => {
                                                        setData('type_id', e.target.value);
                                                    }
                                            }>
                                                <option value=""></option>
                                                {
                                                types.map(type => (
                                                    <option key={
                                                            type.id
                                                        }
                                                        value={
                                                            type.id
                                                    }>
                                                        {
                                                        localeEntries[type.name]
                                                    }</option>
                                                ))
                                            } </select>
                                        </div>

                                    </div>
                                </div>
                                <div className='flex justify-end space-x-4'
                                    actions={
                                        []
                                }>
                                    <Link href={route('checkin.index')}>
                                        <SecondaryButton>{
                                            localeEntries['back']
                                        }</SecondaryButton>
                                    </Link>
                                    <PrimaryButton type='submit'>
                                        {
                                        localeEntries['save']
                                    }</PrimaryButton>
                                </div>
                            </form>
                        </ContentFrame>
                    </AuthenticatedLayout>
                </PromptModalProvider>
            </InfoModalProvider>
        </LocaleContextProvider>
    );
}
