import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";
import {FilterContextProvider} from "@/Components/Table/FilterContext";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableButton
} from "@/Components/Table/Table";
import SectionRow from "@/Components/PageStructure/SectionRow";
import {SortContextProvider} from "@/Components/Table/SortContext";
import {TableFilters} from "@/Components/Table/TableFilters";
import {LocaleContextProvider} from "@/Components/Locale/LocaleContext";
import { ActionButtons } from "@/Components/Form/ActionButtons";
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocaleEntries } from "@/Components/Locale/LocaleContext";
import { router } from "@inertiajs/react";
import { InfoModalProvider, PromptModalProvider, usePromptModal } from "@/Components/Modal/ModalContext";

export default function Index({
    routeName,
    actions,
    localeEntries,
    locale,
    sortEntries,
    sort,
    filters,
    auth,
    items,
    page,
    totalItemCount,
    itemCount,
    itemsPerPage,
    columns,
}) {
    const pageCount = Math.ceil(totalItemCount / itemsPerPage);
    const [from, setFrom] = useState((page - 1) * itemCount);
    const [to, setTo] = useState(from+itemCount); 
    

    useEffect(() => {
        setFrom((page - 1) * itemsPerPage + 1);
    }, [page])

    useEffect(() => {
        setTo(from + itemCount - 1);
    }, [from])

    const handlePageClick = (event) => {
        // Prevent initial reload
        if(event.selected+1 == page) {
            return;
        }

        router.reload({
            method: 'get',
            url: route(routeName),
            data: { page: event.selected + 1},
            only: ['items', 'itemCount', 'totalItemCount', 'page'],  // this will only update 'items' prop in the page component
            preserveState: true,
        });
    };
   
    
    return (
        <InfoModalProvider>
        <PromptModalProvider>

        <LocaleContextProvider initialLocale={locale}
            initialLocaleEntries={localeEntries}>
            <AuthenticatedLayout locale={locale}
                localeEntries={localeEntries}
                user={
                    auth.user
            }>
                <Navbar activeElement={
                        localeEntries[routeName]
                    }
                    className="mt-14"/>
                <ContentFrame>
                    
                    <FilterContextProvider initialFilters={filters}>
                        <SortContextProvider initialSort={sort}>

                            <SectionHeading children={
                                localeEntries[routeName]
                            }/>

                            <SectionRow className="mt-10">
                                <TableFilters route={
                                        route(routeName)
                                    }
                                    attributes={filters}/>
                            </SectionRow>

                            <ActionButtons className='!px-2 pt-10' actions={actions} />

                            { itemCount > 0 ?
                            <Table className="flex-grow">
                                <TableHead entries={ Object.keys(columns).reduce((acc, key) => {
                                                        acc[key] = localeEntries[columns[key]]
                                                    return acc;
                                                    }, {}) }
                                    sortEntries={sortEntries}/>
                                <tbody>
                                    <Items currentItems={items} page={page} />
                                </tbody>
                            </Table> :
                                <SectionRow className='flex flex-grow items-center text-3xl'>
                                    {localeEntries['noRecords']}
                                </SectionRow> 
                            }

                        </SortContextProvider>
                    </FilterContextProvider>


                    <div className="flex justify-between items-center px-5 pt-14 text-2xl">
                        { itemCount > 0 ?
                        <div>
                            {localeEntries['showing']} {localeEntries['from']} {from} {localeEntries['to']} {to} {localeEntries['of']} {totalItemCount}
                        </div> : ''}
                        { pageCount > 1 ?
                        <ReactPaginate
                                initialPage={page-1}
                                className="flex"
                                pageClassName="px-4 py-2 border-slate-200 text-xl border-y-2 font-bold"
                                previousClassName="px-4 py-2 border-slate-200 text-xl border-2 font-bold"
                                nextClassName="px-4 py-2 border-slate-200 text-xl border-y-2 border-r-2 font-bold"
                                breakClassName="px-4 py-2 border-slate-200 text-xl border-2 font-bold"
                                activeClassName="px-4 py-2 border-slate-200 text-xl border-y-2 font-bold text-white bg-cyan-600"
                                breakLabel="..."
                                nextLabel=">"
                                marginPagesDisplayed={2}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                            /> : ""}
                    </div>
                </ContentFrame>
            </AuthenticatedLayout>
        </LocaleContextProvider>
        </PromptModalProvider>
        </InfoModalProvider>
    );
}

function Items({ currentItems }) {

    const { 
        isOpen: isPromptOpen, 
        content: promptContent, 
        onConfirm, 
        onCancel, 
        handleOpen: openPrompt, 
        handleClose: closePrompt
    } = usePromptModal();

    const [action, setAction] = useState(null);
    const [data, setData] = useState(null);



    const submit = (action, data) => {
        if (action && data) {
            router.post(action, data, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const onActionConfirm = (action, data) => {
        submit(action,data);
    }

    const onActionCancel = () => {
        setAction(null);
        setData(null);
    }

    const localeEntries = useLocaleEntries();
    return (
        <>
            {Object.entries(currentItems).map(([key, el]) => {
                return (<TableRow key={key}>
                    {
                        Object.entries(el).map(([key, el]) => {
                            if (el['type'] === 'text' && el['hidden'] !== true) {
                                return (
                                    <TableCell key={key}>
                                        {el['localized'] && localeEntries[el['value']] ? localeEntries[el['value']] : el['value'] }
                                    </TableCell>
                                );
                            }
                            if (el['type'] === 'button') {
                                if(el['method'] === 'get')
                                {
                                    return (<TableCell key={key} className={`flex justify-center items-center w-full }`}>
                                        <TableButton href={el['action']}
                                            className="bg-slate-600">
                                            {localeEntries[key]}
                                        </TableButton>
                                    </TableCell>);
                                } else if(el['method'] === 'post' && el['hidden'] !== true) {
                                    return (<TableCell key={key} className={`flex justify-center items-center w-full }`}>
                                        <form onSubmit={(e) => {
                                                e.preventDefault();
                                                openPrompt(localeEntries['areYouSure'], () => {
                                                    onActionConfirm(el['action'], el['data']);
                                            }, onActionCancel);
                                            }}>
                                            <TableButton type='submit' 
                                                className="bg-slate-600">
                                                {localeEntries[key]}
                                            </TableButton>
                                        </form>
                                    </TableCell>);
                                } 
                            }
                        })
                    }
                </TableRow>
                );
            })}
        </>
    );
}
