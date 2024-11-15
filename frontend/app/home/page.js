"use client";

import { AddNewEventTab, CustomFilter, Hero } from "@/components";
import List from "@/components/EventsList/List";
import { Days, EventCategory, EventMode, EventType } from "@/constants";
import { fetchCurrentUser, fetchEvents } from "@/utils";
import { useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    fetchEvents().then((data) => setEvents(data));
  }, []);
  useEffect(() => {
    fetchCurrentUser().then((data) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    if (user.role === "user") {
      setIsAuthorized(true);
    }
  },[]);

  console.log(isAuthorized);
  // console.log(user.role);
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="flex flex-col w-full sm:px-20 sm:flex-row justify-between items-center mb-10">
        <div className="w-1/2 flex mb-4 sm:mb-0">
          <h1 className="text-4xl font-semibold mr-3">Upcoming</h1>
          <h1 className="text-4xl font-semibold text-primaryblue">Events</h1>
        </div>
        <div className="flex w-1/2 gap-6">
          <CustomFilter title="Days" options={Days} />
          <CustomFilter title="Mode" options={EventMode} />
          <CustomFilter title="Category" options={EventCategory} />
          <CustomFilter title="Type" options={EventType} />
        </div>
      </div>
      <div className="lg:ml-20 pb-10">
      <List list={events} />
      </div>
      {isAuthorized && <AddNewEventTab />}
    </main>
  );
};

export default page;
