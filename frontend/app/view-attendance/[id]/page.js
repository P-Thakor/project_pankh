import UserList from "@/components/UserList";
import { fetchEventById, fetchEvents } from "@/utils";

const AttendancePage = async ({ params }) => {
  const event = await fetchEventById(params.id);
  const attendees = event.attendance;
  const absentees = event.participants.filter(
    (participant) => !attendees.includes(participant)
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <UserList userList={attendees} />
        </div>
        <div>
          <UserList userList={absentees} />
        </div>
      </div>
    </>
  );
};

export async function generateStaticParams() {
  try {
    const events = await fetchEvents();

    if (!Array.isArray(events)) {
      throw new Error("Expected an array of events");
    }

    return events.map((event) => ({
      id: event._id.toString(),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default AttendancePage;
