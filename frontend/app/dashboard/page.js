import { Profile, EventsCreated, EventsParticipated } from "@/components";
import EventAttendanceChart from "@/components/EventAttendanceChart";
import { fetchEvents } from "@/utils";
// import axios from "axios";
export default async function Dashboard() {
  const events = await fetchEvents();
  // const res = await axios.get("http://localhost:8001/api/v1/user/me", {
  //   credentials: "include",
  // });
  // const data = await res.json();
  // console.log(data);

  return (
    <main>
      <div className="flex flex-col min-h-screen p-6 space-y-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-primaryblue">Dashboard</h1>
        {
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
            <Profile />
            <EventAttendanceChart />
          </div>
        }
        <EventsCreated events={events} />
        <EventsParticipated events={events} />
      </div>
    </main>
  );
}
