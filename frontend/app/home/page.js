import { AddNewEventTab, CustomFilter, Hero } from "@/components";
import List from "@/components/EventsList/List";
import { Days, EventCategory, EventMode } from "@/constants";
import { fetchEvents } from "@/utils";

const page = async () => {
  const events = await fetchEvents();
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="flex flex-col w-full px-20 sm:flex-row justify-between items-center mb-10">
        <div className="w-1/2 flex mb-4 sm:mb-0">
          <h1 className="text-4xl font-semibold mr-3">Upcoming</h1>
          <h1 className="text-4xl font-semibold text-primaryblue">Events</h1>
        </div>
        <div className="flex w-1/2 gap-6">
          <CustomFilter title="Days" options={Days} />
          <CustomFilter title="Mode" options={EventMode} />
          <CustomFilter title="Category" options={EventCategory} />
        </div>
      </div>
      <List list={events} />
      <AddNewEventTab />
    </main>
  );
};

export default page;
