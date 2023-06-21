import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SectionHeading from '@/Components/SectionHeading';
import ContentFrame from '@/Layouts/ContentFrame';
import { Table, Thead, TableRow, TableCell, TableButtonCell } from '@/Components/Table';


export default function Appointments({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <ContentFrame activeNavbarElement="Appointments">

                <SectionHeading children={'Appointments'} />

                <Table>
                        <Thead entries={[
                            'Name',
                            'Email',
                            'Place',
                            'Date',
                            /* Header for a button */
                            'Time',
                            ''
                        ]} />

                        <tbody>
                            <TableRow>
                                <TableCell isFirst={true} children={'Jane Doe'}/>
                                <TableCell isFirst={true}  children={'jane.doe@email.com'}/>
                                <TableCell isFirst={true}  children={'3-201'}/>
                                <TableCell isFirst={true}  children={'25th June, 2023'}/>
                                <TableCell isFirst={true}  children={'12:30'}/>
                                <TableButtonCell isFirst={true}  children={'View'} />
                            </TableRow>

                            <TableRow>
                                <TableCell children={'Jane Doe'}/>
                                <TableCell children={'jane.doe@email.com'}/>
                                <TableCell children={'3-201'}/>
                                <TableCell children={'25th June, 2023'}/>
                                <TableCell children={'12:30'}/>
                                <TableButtonCell children={'View'} />
                            </TableRow>

                        </tbody>

                </Table>

            </ContentFrame>
        </AuthenticatedLayout>
    );
};
