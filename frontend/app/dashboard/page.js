import { DashboardComp } from "@/components";
import UserContextProvider from "@/context/UserContextProvider";
import { fetchEvents } from "@/utils";
export default async function Dashboard() {

  const events = await fetchEvents();

  return (
    <main>
      <DashboardComp events = {events}/>
    </main>
  );
}
