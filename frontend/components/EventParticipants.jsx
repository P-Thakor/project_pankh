"use client";

import { useContext, useEffect, useState } from "react";
import { AuthModal } from ".";
import { useRouter } from "next/navigation";
import { fetchEventById } from "@/utils";
import UserContext from "@/context/UserContext";

export default function EventParticipants({ participants = [], eventId = "" }) {
  const [loading, setLoading] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [event, setEvent] = useState(null);

  const router = useRouter();

  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const eventData = await fetchEventById(eventId);
      setEvent(eventData);
    })();
  }, []);

  const handleToggle = (participant) => {
    setSelectedParticipants((prev) =>
      prev.includes(participant._id)
        ? prev.filter((p) => p !== participant._id)
        : [...prev, participant._id]
    );
  };

  const handleSubmit = async () => {
    if (selectedParticipants.length === 0) {
      alert("Please select at least one participant.");
      return;
    }

    setLoading(true);

    try {
      // console.log("Submitting attendance for:", selectedParticipants);

      if (event.attendance.length > 0) {
        setTitle("Attendance Already Submitted");
        setMessage("Attendance has already been submitted for this event.");
        setModalOpen(true);
        setTimeout(() => router.push(`/view-attendance/${eventId}`), 2500);
        return;
      }

      const res = await fetch(
        `http://localhost:8001/api/v1/event/attendance/${eventId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userIds: selectedParticipants }),
        }
      );

      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        setTitle("Attendance Submitted");
        setMessage("Attendance submitted successfully!");
        setIconColor("bg-green-500");
        setModalOpen(true);
        setTimeout(() => router.push(`/view-attendance/${eventId}`), 2500);
      } else {
        setTitle("Attendance Submission Unsuccessful");
        setMessage(data.message);
        setIconColor("bg-red-500");
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setTitle("Error");
      setMessage("An error occurred while submitting attendance.");
      setIconColor("bg-red-500");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white shadow rounded-2xl">
      <div className="flex">
      <h2 className="mb-4 text-2xl font-semibold text-blue-600">
        Participants
      </h2>
      {<h3 className="mt-1 ml-4 text-xl text-gray-700">({participants.length})</h3>}
      </div>
      {loading ? (
        <p className="text-gray-500">Loading participants...</p>
      ) : participants.length === 0 ? (
        <p className="text-gray-500">No participants registered.</p>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y divide-gray-200">
            {participants.map((participant, index) => (
              <li
                key={index}
                className="flex items-center justify-start px-4 py-3 rounded-md hover:bg-gray-50"
              >
                {user && event && user._id === event.creator && (<input
                  type="checkbox"
                  className="text-blue-600 rounded form-checkbox"
                  checked={selectedParticipants.includes(participant._id)}
                  onChange={() => handleToggle(participant)}
                />)}
                <div
                  className="flex items-center ml-4 space-x-2"
                  onClick={() => handleToggle(participant)}
                >
                  <span className="text-gray-600">
                    {participant.collegeId} -{" "}
                  </span>
                  <p className="text-gray-900">{participant.username}</p>{" "}
                </div>
              </li>
            ))}
          </ul>
          {user && event && user._id === event.creator && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Attendance"}
            </button>
          )}
        </div>
      )}
      <AuthModal
        isVisible={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        iconColor={iconColor}
        message={message}
      />
    </div>
  );
}
