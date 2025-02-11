"use client";

import { useEffect, useState } from "react";
import List from "./EventsList/List";

const NewEventsCreatedList = ({user, events}) => {
    const [createdEvents, setCreatedEvents] = useState([]);
  
    useEffect(() => {
      if (user?.role === "admin" || user?.role === "faculty-member") {
        let tempcreatedlist = [];
        events.forEach((event) => {
          event.creator === user._id && tempcreatedlist.push(event);
        });
        setCreatedEvents(tempcreatedlist);
      }
    }, [user, events]);
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        {/* Events Created by User (Only for Admin & Faculty) */}
        {(user.role === "faculty-member" || user.role === "admin") && (
          <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-primaryblue">
              Events Created
            </h2>
            {createdEvents.length > 0 ? (
              <List list={createdEvents} style="ml-2" isFaculty={true}/>
            ) : (
              <p className="mt-4 text-gray-500">No events organized yet!</p>
            )}{" "}
          </div>
        )}
      </div>
    );
}

export default NewEventsCreatedList
