import React, { useEffect } from 'react';
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
import DatePicker from "react-datepicker";
import { router } from '@inertiajs/react';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { InfoModalProvider, PromptModalProvider } from '@/Components/Modal/ModalContext';


export default function EditVisit({
	visit,
	chosenEmployeeId,
	availableTimes,
	employees,
	statuses,
	title,
	localeEntries,
	locale,
	auth,
	actions
}) {
	const handleEmployeeChange = (e) => {
		setData('employee_id', e.target.value);
		router.reload({
			only: ['availableTimes'], // this will only update 'availableTimes' prop in the page component
			data: {
				'employee_id': e.target.value
			}
		});
	};


	const {
		data,
		setData,
		put,
		processing,
		errors
	} = useForm({
		id: visit.id,
		purpose: visit.purpose,
		starting_at: undefined,
		employee_id: visit.employee_id,
		status_id: visit.status_id
	});


	const handleSubmit = (e) => {
		e.preventDefault();
		put(route("appointments.update", {data: data}));
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
					localeEntries['appointments.index']
				}
					className="mt-14" />
				<ContentFrame className='flex flex-col'>

					<SectionHeading>{
						localeEntries['editAppointment']
					}</SectionHeading>
					<form onSubmit={handleSubmit}
						className='flex flex-col flex-grow'>
						<div className='flex-grow'>
							<div className="grid grid-cols-2 px-10 mt-10 w-full">
								<div className="p-8 text-slate-600">
									<InputLabel className='mb-5 !text-2xl' htmlFor="purpose"
										value={
											localeEntries['visit_applications.purpose']
										} />
									<InputError message={
										errors['purpose']
									}
										className="my-2" />
									<TextInput id="purpose" className="block w-full" type="text" name="purpose"
										value={
											data.purpose
										}
										onChange={
											e => setData('purpose', e.target.value)
										}
										autoComplete="purpose"
										required />
								</div>
								<div className="p-8 text-slate-600">
									<InputLabel className='mb-5 !text-2xl' htmlFor="employee"
										value={
											localeEntries['employees.name']
										} />
									<InputError message={
										errors['employee_id']
									}
										className="my-2" />
									<select id="employee" name="employee_id"
										value={
											data.employee_id
										}
										onChange={handleEmployeeChange}>
										<option value=""></option>
										{
											employees.map(employee => (
												<option key={
													employee.id
												}
													value={
														employee.id
													}>
													{
														employee.name
													}</option>
											))
										} </select>
								</div>

                                <div className="p-8 text-slate-600">
                                    <InputLabel className='mb-5 !text-2xl' htmlFor="time_slot" value={localeEntries['appointmentTimeSlot']}/>
                                    <InputError message={errors['starting_at']} className="my-2" />
                                    <select id="starting_at" name="starting_at" value={data.starting_at} onChange={e => {setData('starting_at', e.target.value)}}>
                                        <option value={false}>-</option>
                                        {availableTimes.map(time => (
                                            <option key={time.key} value={time.id}>{time.starting_at}</option>
                                        ))}
                                    </select>
                                </div>
								<div className="p-8 text-slate-600">
									<InputLabel className='mb-5 !text-2xl' htmlFor="status"
										value={
											localeEntries['status']
										} />
									<InputError message={
										errors['status_id']
									}
										className="my-2" />
									<select id="status" name="status_id"
										value={
											data.status_id
										}
										onChange={
											e => {
												setData('status_id', e.target.value)
											}
										}>
										{
											statuses.map(status => (
												<option key={
													status.id
												}
													value={
														status.id
													}>
													{
														status.name
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
							<Link href={route('appointments.index')}>
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
