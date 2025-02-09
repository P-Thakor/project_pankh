"use client";

import { useContext, useEffect, useState } from "react";
import List from "@/components/EventsList/List";
import UserContext from "../../context/UserContext";

export default function EventsParticipated({ events = [] }) {
  const [attendedEventList, setAttendedEventList] = useState([]);
  const [missedEventList, setMissedEventList] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      let templist = events.filter((event) =>
        user.eventsAttended.includes(event._id)
      );
      setAttendedEventList(templist);
      let templist2 = events.filter((event) =>
        user.eventsMissed.includes(event._id)
      );
      setMissedEventList(templist2);
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
          Events Attended
        </h2>
        {attendedEventList.length > 0 ? (
          <List list={attendedEventList} style="ml-2" />
        ) : (
          <p className="mt-4 text-gray-500">No events participated yet!</p>
        )}
      </div>

      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-primaryblue">
          Events Missed
        </h2>
        {missedEventList.length > 0 ? (
          <List list={missedEventList} style="ml-2" />
        ) : (
          <p className="mt-4 text-gray-500">No events missed yet!</p>
        )}
      </div>
    </>
  );
}