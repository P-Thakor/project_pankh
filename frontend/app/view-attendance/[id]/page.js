import UserList from "@/components/UserList";
import { fetchEventById, fetchEvents } from "@/utils";

const AttendancePage = async ({ params }) => {
  if (!params?.id) return <p>Invalid Event</p>;

  const event = await fetchEventById(params.id);
  if (!event) return <p>Event not found</p>;

  const attendees = event.attendance || [];
  const absentees = event.participants?.filter(
    (participant) => !attendees.some((attendee) => attendee._id === participant._id)
  ) || [];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Attendees</h2>
        <UserList userList={attendees} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Absentees</h2>
        <UserList userList={absentees} />
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  try {
    const events = await fetchEvents();

    if (!Array.isArray(events)) {
      throw new Error("Expected an array of events");
    }

    return events.map((event) => ({
      id: event._id?.toString() || "",
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default AttendancePage;
