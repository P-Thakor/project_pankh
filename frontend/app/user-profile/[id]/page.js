"use client";

import EventAttendancePieChart from "@/components/EventAttendancePieChart";
import NewEventsCreatedList from "@/components/NewEventsCreatedList";
import ParticipatedEvents from "@/components/ParticipatedEvents";
import UserProfile from "@/components/UserProfile";
import { fetchEvents, fetchUserById } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserProfilePage = async ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn");
      console.log(loggedIn);
      if (loggedIn == 0) {
        router.push("/sign-in");
      }
    }
  }, []);

  const { id } = params;
  const res = await fetchUserById(id);
  const user = res.data;
  console.log(user);
  const events = await fetchEvents();

  const isBlackListed = !user?.active;
  console.log(isBlackListed);

  const handleActivateUser = async () => {
    if (!confirm("Are you sure you want to reactivate this user?")) {
      return;
    }
    try {
      const res = await fetch("/api/v1/user/activateUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id }),
      });
      if (res.ok) {
        alert("User has been activated");
        window.location.reload();
      } else {
        alert("Failed to activate user");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to activate user");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        <UserProfile user={user} />
        {user.role === "user" && <EventAttendancePieChart user={user} />}
      </div>
      {isBlackListed && (
        <div className="p-4 text-center bg-red-200 text-red-800">
          <p>
            This user has been blacklisted due to their consecutive absences
          </p>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleActivateUser}
          >
            Activate User
          </button>
        </div>
      )}
      {user.role === "user" ? (
        <ParticipatedEvents user={user} events={events} />
      ) : (
        <NewEventsCreatedList user={user} events={events} />
      )}
    </div>
  );
};

export default UserProfilePage;
