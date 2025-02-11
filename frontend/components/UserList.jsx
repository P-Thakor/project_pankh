"use client";

import { useState } from "react";
import { EventsCreated } from "@/components";
import { useRouter } from "next/navigation";
import UserProfile from "./UserProfile";

const UserList = ({ userList, events }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const router = useRouter();

  if (!Array.isArray(userList) || userList.length === 0) {
    return (
      <p className="p-3 text-center rounded-lg shadow-sm bg-blue-50"> - </p>
    );
  }

  const handleUserClick = (user) => {
    // setSelectedUser(selectedUser?._id === user._id ? null : user);
    router.push(`/user-profile/${user._id}`);
  };

  return (
    <ul className="space-y-2">
      {userList.map((user) => (
        <li
          key={user._id}
          className="p-3 rounded-lg shadow-sm cursor-pointer bg-blue-50"
          onClick={() => handleUserClick(user)}
        >
          {user.role === "user" && (
            <span className="font-medium">{user.collegeId}</span>
          )}{" "}
          - <span className="text-gray-600">{user.username}</span>
          {selectedUser?._id === user._id && (
            <>
              {/* <Profile userData={selectedUser} /> */}
              {/* <EventsCreated events={events} user={selectedUser} /> */}

              <UserProfile user={selectedUser} events={events} />
              <EventsCreated events={events} user={selectedUser} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
