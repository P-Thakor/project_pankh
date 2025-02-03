import GenerateReportButton from "@/components/GenerateReportButton";
import UserList from "@/components/UserList";
import { fetchEventById, fetchEvents } from "@/utils";

const AttendancePage = async ({ params }) => {
  if (!params?.id)
    return <p className="text-red-500 text-center py-4">Invalid Event</p>;

  const event = await fetchEventById(params.id);
  if (!event)
    return <p className="text-red-500 text-center py-4">Event not found</p>;

  const attendees = event.attendance || [];
  const absentees =
    event.participants?.filter(
      (participant) =>
        !attendees.some((attendee) => attendee._id === participant._id)
    ) || [];

  return (
    <div className="p-4 min-h-lvh">
      <h1 className="text-2xl font-bold text-center mb-6">
        {event.name} - Attendance Report
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendees Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-green-600">Attendees</h2>
          <UserList userList={attendees} />
        </div>

        {/* Absentees Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-red-600">Absentees</h2>
          <UserList userList={absentees} />
        </div>
      </div>
      <GenerateReportButton eventId={params.id} />
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
