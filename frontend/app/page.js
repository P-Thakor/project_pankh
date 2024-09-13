import { AddNewEventTab, Hero, EventHero, EventDescription, CustomFilter, CreateEvent, SignUp } from "@/components";
import List from "@/components/EventsList/List";
import SignIn from "@/components/SignIn";
import { Days, EventCategory, EventMode } from "@/constants";
import { fetchEvents } from "@/utils";

export default async function Home() {
  const eventData = await fetchEvents();
  console.log(eventData);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-0 py-24">
      <Hero />
      <EventHero item={eventData[0]}/>
      <List list={eventData} />
      <AddNewEventTab />
      <EventDescription event={eventData[0]} />
      <div className="flex flex-col w-full px-20 sm:flex-row">
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold">Upcoming Events</h1>
        </div>
        <div className="flex w-1/2 gap-6">
          <CustomFilter title="Days" options={Days} />
          <CustomFilter title="Mode" options={EventMode} />
          <CustomFilter title="Category" options={EventCategory} />
        </div>
      </div>
      <SignUp />
      <SignIn />
    </main>
  );
}
