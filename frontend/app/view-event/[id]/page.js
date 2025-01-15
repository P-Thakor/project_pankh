import { EventDescription, EventHero } from "@/components";
import List from "@/components/EventsList/List";
import UserContextProvider from "@/context/UserContextProvider";
import { fetchEventById, fetchEvents } from "@/utils";

const EventPage = async ({ params }) => {
  const eventData = await fetchEventById(params.id);
  const events = await fetchEvents();

  return (
    <UserContextProvider>
    <main className="overflow-hidden">
      <EventHero item={eventData} />
      <EventDescription event={eventData} />
      <div className="w-1/2 flex mb-4 sm:ml-24 sm:mb-0 ">
        <h1 className="text-4xl font-semibold mr-3">Other </h1>
        <h1 className="text-4xl font-semibold text-primaryblue">Events</h1>
      </div>
      <List list={events.filter((item) => item._id != params.id)} />
    </main>
    </UserContextProvider>
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

export default EventPage;
