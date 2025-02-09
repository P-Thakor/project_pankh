"use client";

import { useContext, useEffect, useState } from "react";
import List from "@/components/EventsList/List";
import UserContext from "../../context/UserContext";

export default function DashboardComp({ events = [] }) {
  const [eventList, setEventList] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      let templist = events.filter((event) =>
        user.eventsParticipated?.includes(event._id)
      );
      setEventList(templist);
    }
  }, [user, events]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Events Participated Section */}
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-primaryblue">
          Events Participated
        </h2>
        {eventList.length > 0 ? (
          <List list={eventList} style="ml-2" />
        ) : (
          <p className="mt-4 text-gray-500">No events participated yet!</p>
        )}
      </div>
    </>
  );
}
