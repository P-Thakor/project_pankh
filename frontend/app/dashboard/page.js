import { DashboardComp } from "@/components"
import UserContextProvider from "@/context/UserContextProvider"
export default function Dashboard() {
    return (
        <UserContextProvider>
        <main>
            <DashboardComp/>
        </main>
        </UserContextProvider>
    )
}