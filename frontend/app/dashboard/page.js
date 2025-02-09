import { Profile, EventsCreated, EventsParticipated } from "@/components";
import { fetchEvents } from "@/utils";
export default async function Dashboard() {
  const events = await fetchEvents();

  return (
    <main>
      <div className="flex flex-col min-h-screen p-6 space-y-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-primaryblue">Dashboard</h1>
        <Profile />
        <EventsCreated events={events} />
        <EventsParticipated events={events} />
      </div>
    </main>
  );
}