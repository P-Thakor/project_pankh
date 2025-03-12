import { EventParticipants } from "@/components";
import { fetchEventById, fetchEvents } from "@/utils";

export const dynamic = "force-dynamic";

const ParticipantsPage = async({params}) => {

  const event = await fetchEventById(params.id);

  const participants = event.participants;
  // console.log(event);
  // console.log(participants);

  return (
    <>
      <EventParticipants participants={participants} eventId={params.id} />
    </>
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

export default ParticipantsPage
