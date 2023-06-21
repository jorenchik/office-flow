import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import ContentWrapper from "@/Components/ContentWrapper"
import ContentFrame from "@/Components/ContentFrame"

export default function Authenticated({user, aboveChildren, children}) {
    return (
        <div>
            <div className="pb-20 min-h-screen bg-gray-50">
                <Header user={user} />
                <ContentWrapper>
                    {aboveChildren}
                    <ContentFrame>
                        {children}
                    </ContentFrame>
                </ContentWrapper>
            </div>
            <Footer />
        </div>
    )
}