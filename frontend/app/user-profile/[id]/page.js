import EventAttendancePieChart from "@/components/EventAttendancePieChart";
import ParticipatedEvents from "@/components/ParticipatedEvents";
import UserProfile from "@/components/UserProfile";
import { fetchEvents, fetchUserById } from "@/utils";

const UserProfilePage = async({params}) => {
    const {id} = params;
    const res = await fetchUserById(id);
    const user = res.data;
    console.log(user);
    const events = await fetchEvents();

  return (
    <>
    <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
      <UserProfile user={user} />
      <EventAttendancePieChart user={user} />
    </div>
      <ParticipatedEvents user={user} events={events} />
    </>
  )
}

export default UserProfilePage