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

export default function Appointments({ sortEntries, sort, filters, auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Navbar activeElement="Appointments" className="mt-14" />
            <ContentFrame activeNavbarElement="Appointments">

                <FilterContextProvider initialFilters={filters}>
                    <SortContextProvider initialSort={sort}>

                        <SectionHeading children={"Appointments"} />

                        <SectionRow className="mt-10">
                            <TableFilters
                                route={route("appointments")}
                                attributes={filters}
                            />
                        </SectionRow>
                        
                        <Table className="flex-grow">
                            <TableHead
                                entries={[
                                    "Name",
                                    "Email",
                                    "Place",
                                    "Date",
                                    "Time",
                                    /* Header for a button */
                                    "",
                                ]}
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
                                        children={"View"}
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
                                    <TableButtonCell children={"View"} />
                                </TableRow>
                            </tbody>
                        </Table>

                    </SortContextProvider>
                </FilterContextProvider>

                <Pagination />

            </ContentFrame>
        </AuthenticatedLayout>
    );
}
