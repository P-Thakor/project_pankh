import { AddNewEventTab, EventsList, Hero, EventHero, EventDescription, CustomFilter } from "@/components";
import events from "@/components/EventPage/dummyData";
import { Days, EventCategory, EventMode } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-0 py-24">
      <Hero />
      <EventHero item={events}/>
      <EventsList />
      <AddNewEventTab />
      <EventDescription event={events} />
      <div className="flex w-full flex-col sm:flex-row px-20">
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold">Upcoming Events</h1>
        </div>
        <div className="w-1/2 flex gap-6">
          <CustomFilter title="Days" options={Days} />
          <CustomFilter title="Mode" options={EventMode} />
          <CustomFilter title="Category" options={EventCategory} />
        </div>
      </div>
    </main>
  );
}
