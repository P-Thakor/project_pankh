"use client";

import { AddNewEventTab, CustomFilter, Hero} from "@/components";
import List from "@/components/EventsList/List";
import { Days, EventCategory, EventMode, EventType } from "@/constants";
import UserContext from "@/context/UserContext";
import { fetchCurrentUser, fetchEvents } from "@/utils";
import { useContext, useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);
  // const [user, setUser] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    fetchEvents().then((data) => setEvents(data));
  }, []);
  // useEffect(() => {
  //   fetchCurrentUser().then((data) => {
  //     setUser(data);
  //   });
  // }, []);

  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user?.role === "faculty-member" || user?.role === "admin") {
      setIsAuthorized(true);
    }
    console.log(user);
  },[]);

  // console.log(isAuthorized);
  // console.log(user.role);
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="flex flex-col items-center justify-between w-full mb-10 sm:px-20 sm:flex-row">
        <div className="flex w-1/2 mb-4 sm:mb-0">
          <h1 className="mr-3 text-4xl font-semibold">Upcoming</h1>
          <h1 className="text-4xl font-semibold text-primaryblue">Events</h1>
        </div>
        <div className="flex w-1/2 gap-6">
          <CustomFilter title="Days" options={Days} />
          <CustomFilter title="Mode" options={EventMode} />
          <CustomFilter title="Category" options={EventCategory} />
          <CustomFilter title="Type" options={EventType} />
        </div>
      </div>
      <div className="pb-10 lg:ml-20">
      <List list={events} />
      </div>
      {isAuthorized && <AddNewEventTab />}
    </main>
  );
};

export default page;
