"use client";

import { useState } from "react";

export default function EventParticipants({ participants = [] }) {
  const [loading, setLoading] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // Handle checkbox toggle
  const handleToggle = (participant) => {
    setSelectedParticipants((prev) =>
      prev.includes(participant)
        ? prev.filter((p) => p !== participant)
        : [...prev, participant]
    );
  };

  // Handle attendance submission
  const handleSubmit = async () => {
    if (selectedParticipants.length === 0) {
      alert("Please select at least one participant.");
      return;
    }

    setLoading(true);
    try {
      // Simulate sending data to the backend
      console.log("Submitting attendance for:", selectedParticipants);

      // Replace with actual API call
      // await fetch("/api/attendance", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ attendees: selectedParticipants }),
      // });

      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
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
                className="flex items-center justify-start py-3 px-4 hover:bg-gray-50 rounded-md"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600 rounded"
                  checked={selectedParticipants.includes(participant)}
                  onChange={() => handleToggle(participant)}
                />
                <div className="flex items-center space-x-2 ml-4" onClick={() => handleToggle(participant)}>
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
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      )}
    </div>
  );
}
