import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Indicator from '@/Components/Indicator';
import Infopanel from '@/Components/Infopanel';
import SectionHeading from '@/Components/SectionHeading';
import VLine from '@/Components/VLine';
import SectionRow from '@/Components/SectionRow';
import ContentFrame from '@/Layouts/ContentFrame';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <ContentFrame activeNavbarElement='Dashboard'>
                <SectionHeading text="Overview"/>
                <SectionRow>
                    <Infopanel>
                        <span className="w-full text-5xl font-light text-slate-700"> 12:25 </span>
                        <span className="w-full text-2xl font-light text-slate-600"> 6th June, 2023</span>
                    </Infopanel>
                    <VLine/>
                    <Infopanel>
                            <span className="w-full text-5xl font-light text-slate-700"> 8 hours 12 minutes in </span>
                            <span className="w-full text-2xl font-light text-slate-600"> checked in at 8:13</span>
                    </Infopanel>
                </SectionRow>
                <SectionRow>
                    <Indicator number={22} changePercent={2.6} text="Appointments in June"/>
                    <Indicator number={22} changePercent={2.6} text="Hours worked in June"/>
                    <Indicator number={22} changePercent={2.6} text="Upcoming appointments"/>
                    <Indicator number={22} changePercent={2.6} text="Days worked in June"/>
                    <Indicator number={22} changePercent={2.6} text="Days worked in June"/>
                </SectionRow>
            </ContentFrame>
        </AuthenticatedLayout>
    );
}
