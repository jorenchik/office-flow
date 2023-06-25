import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Pagination from "@/Components/Pagination/Pagination";
import Navbar from "@/Components/Navigation/Navbar";
import { FilterContextProvider } from "@/Components/Table/FilterContext";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableButtonCell,
} from "@/Components/Table/Table";
import SectionRow from "@/Components/PageStructure/SectionRow";
import { SortContextProvider } from "@/Components/Table/SortContext";
import { TableFilters } from "@/Components/Table/TableFilters";
import { LocaleContextProvider } from "@/Components/Locale/LocaleContext";

export default function Appointments({ localeEntries, locale, sortEntries, sort, filters, auth }) {
    return (
        <LocaleContextProvider initialLocale={locale} initialLocaleEntries={localeEntries} >
        <AuthenticatedLayout locale={locale} localeEntries={localeEntries} user={auth.user}>
            <Navbar activeElement={localeEntries['appointments']} className="mt-14" />
            <ContentFrame>

                <FilterContextProvider initialFilters={filters}>
                    <SortContextProvider initialSort={sort}>

                        <SectionHeading children={localeEntries['appointments']} />

                        <SectionRow className="mt-10">
                            <TableFilters
                                route={route("appointments")}
                                attributes={filters}
                            />
                        </SectionRow>
                        
                        <Table className="flex-grow">
                            <TableHead
                                entries={{
                                    name: localeEntries['name'],
                                    email: localeEntries['email'],
                                    place: localeEntries['place'],
                                    date: localeEntries['date'],
                                    time: localeEntries['time'],
                                    /* Header for a button */
                                    editButton: "",
                                }}
                                sortEntries={sortEntries}
                            />

                            <tbody>
                                <TableRow>
                                    <TableCell
                                        isFirst={true}
                                        children={"Jane Doe"}
                                    />
                                    <TableCell
                                        isFirst={true}
                                        children={"jane.doe@email.com"}
                                    />
                                    <TableCell
                                        isFirst={true}
                                        children={"3-201"}
                                    />
                                    <TableCell
                                        isFirst={true}
                                        children={"25th June, 2023"}
                                    />
                                    <TableCell
                                        isFirst={true}
                                        children={"12:30"}
                                    />
                                    <TableButtonCell
                                        isFirst={true}
                                        children={localeEntries['view']}
                                    />
                                </TableRow>

                                <TableRow>
                                    <TableCell children={"Jane Doe"} />
                                    <TableCell
                                        children={"jane.doe@email.com"}
                                    />
                                    <TableCell children={"3-201"} />
                                    <TableCell children={"25th June, 2023"} />
                                    <TableCell children={"12:30"} />
                                    <TableButtonCell
                                        isFirst={true}
                                        children={localeEntries['view']}
                                    />
                                </TableRow>
                            </tbody>
                        </Table>

                    </SortContextProvider>
                </FilterContextProvider>

                <Pagination />

            </ContentFrame>
        </AuthenticatedLayout>
        </LocaleContextProvider>
    );
}
