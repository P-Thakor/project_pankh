import { AddNewEventTab, EventsList } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-0 py-24">
      <EventsList />
      <AddNewEventTab />
    </main>
  );
}
