import { AddNewEventTab, EventsList, Hero, EventHero } from "@/components";
import events from "@/components/EventPage/dummyData";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-0 py-24">
      <Hero />
      <EventHero item={events}/>
      <EventsList />
      <AddNewEventTab />
    </main>
  );
}
