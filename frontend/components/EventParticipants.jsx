"use client";

import { useState } from "react";

export default function EventParticipants({ participants = [], eventId = "" }) {
  const [loading, setLoading] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

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
      console.log("Submitting attendance for:", selectedParticipants);

      const res = await fetch(`http://localhost:8000/api/v1/event/attendance/${eventId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: selectedParticipants }),
      });

      const data = await res.json();
      console.log(data);

      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white shadow rounded-2xl">
      <h2 className="mb-4 text-2xl font-semibold text-blue-600">
        Participants
      </h2>
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
                <input
                  type="checkbox"
                  className="text-blue-600 rounded form-checkbox"
                  checked={selectedParticipants.includes(participant._id)}
                  onChange={() => handleToggle(participant)}
                />
                <div className="flex items-center ml-4 space-x-2" onClick={() => handleToggle(participant)}>
                <span className="text-gray-600">{participant.collegeId} - </span>
                  <p className="text-gray-900">
                    {participant.username}
                  </p>{" "}
                  </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      )}
    </div>
  );
}
