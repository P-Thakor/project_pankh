"use client";

import { AddNewEventTab, CustomFilter, Hero } from "@/components";
import List from "@/components/EventsList/List";
import { Days, EventCategory, EventMode, EventType } from "@/constants";
import UserContext from "@/context/UserContext";
import { fetchCurrentUser, fetchEvents } from "@/utils";
import { useContext, useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);
  const [activeSection, setActiveSection] = useState("Upcoming");
  // const [user, setUser] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [upcomingList, setUpcomingList] = useState([]);
  const [pastList, setPastList] = useState([]);
  const [ongoingList, setOngoingList] = useState([]);
  let upcomingEvents = [];
  let ongoingEvents = [];
  let pastEvents = [];

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      const date = new Date();
      // const date = today.toISOString();
      console.log(data);
      data.forEach((event) => {
        const startDateObj = new Date(event.startDate);
        const endDateObj = new Date(event.endDate);
        if (startDateObj > date) {
          upcomingEvents.push(event);
        } else if (startDateObj < date && endDateObj > date) {
          ongoingEvents.push(event);
        } else {
          pastEvents.push(event);
        }
      });
      setUpcomingList(upcomingEvents);
      setOngoingList(ongoingEvents);
      setPastList(pastEvents);
      console.log(upcomingEvents);
    });
  }, []);
  // useEffect(() => {
  //   const date = new Date();
  //   console.log(date);
  //     upcomingEvents = events.filter((event) => event.startDate > date);
  //     ongoingEvents = events.filter((event) => {
  //       event.startDate < date && event.endDate > date;
  //     });
  //     pastEvents = events.filter((event) => event.endDate < date);
  //     console.log(events);
  //     console.log(upcomingEvents);
  //     console.log(ongoingEvents);
  //     console.log(pastEvents);
  // }, []);

  useEffect(() => {
    console.log(upcomingList);
  }, [upcomingList]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.role === "faculty-member" || user?.role === "admin") {
      setIsAuthorized(true);
    }
    console.log(user);
  }, []);

  // console.log(isAuthorized);
  // console.log(user.role);
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="flex flex-col items-center justify-between w-full mb-10 sm:px-20 sm:flex-row">
        <div className="flex flex-col items-center w-full mb-4 sm:flex-row sm:w-1/2 sm:mb-0 sm:items-start">
          <h1 className="mr-0 text-2xl font-semibold sm:mr-3 sm:text-4xl">
            {activeSection}
          </h1>
          <h1 className="text-2xl font-semibold sm:text-4xl text-primaryblue">
            Events
          </h1>
        </div>

        {/* <div className="flex w-1/2 gap-6">
          <CustomFilter title="Days" options={Days} />
          <CustomFilter title="Mode" options={EventMode} />
          <CustomFilter title="Category" options={EventCategory} />
          <CustomFilter title="Type" options={EventType} />
        </div> */}
        <div className="flex w-full gap-10 overflow-x-auto lg:w-1/2">
          <ul className="flex flex-wrap justify-center w-full lg:justify-start">
            {["Upcoming", "Ongoing", "Completed"].map((item) => (
              <li
                key={item}
                onClick={() => setActiveSection(item)}
                className={`p-4 cursor-pointer text-lg sm:text-xl lg:text-2xl transition-colors text-gray-500 font-semibold ${
                  activeSection === item
                    ? "hidden" // Active item style
                    : "hover:text-primaryblue" // Hover style
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pb-10 lg:ml-28">
        {activeSection === "Upcoming" && setTimeout(() => {}, 1000) && (
          <List list={upcomingList} />
        )}
        {activeSection === "Ongoing" && <List list={ongoingList} />}
        {activeSection === "Completed" && <List list={pastList} />}
      </div>
      {isAuthorized && <AddNewEventTab />}
    </main>
  );
};

export default page;
