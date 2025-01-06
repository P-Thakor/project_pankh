import { CreateEvent } from "@/components"
import UserContextProvider from "@/context/UserContextProvider"
export default function CreateEventPage() {
    return (
        <UserContextProvider>
        <main>
            <CreateEvent />
        </main>
        </UserContextProvider>
    )
}