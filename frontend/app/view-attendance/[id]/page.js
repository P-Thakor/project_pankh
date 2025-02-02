
const AttendancePage = async ({ params }) => {
    const event = await fetchEventById(params.id);
    const attendees = event.attendance;

  return (
    <div>
      
    </div>
  )
}

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

export default AttendancePage
