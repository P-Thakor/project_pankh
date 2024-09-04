import { AddNewEventTab, EventsList, Hero, EventHero, EventDescription, CustomFilter, CreateEvent } from "@/components";
import events from "@/components/EventPage/dummyData";
import { Days, EventCategory, EventMode } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-0 py-24">
      <CreateEvent/>
      <Hero />
      <EventHero item={events}/>
      <EventsList />
      <AddNewEventTab />
      <EventDescription event={events} />
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
    </main>
  );
}
