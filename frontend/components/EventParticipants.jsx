"use client";

import { useEffect, useState } from "react";

export default function EventParticipants({ eventId }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParticipants() {
      try {
        // Fetch event details to get participants array
        const eventRes = await fetch(`/api/v1/event/getEvent/${eventId}`);
        const eventData = await eventRes.json();
        console.log(eventData);
        
        if (!eventData?.data?.participants || eventData.data.participants.length === 0) {
          setParticipants([]);
          setLoading(false);
          return;
        }

        // Fetch user details for each participant
        const users = await Promise.all(
          eventData.data.participants.map(async (participantId) => {
            const userRes = await fetch(`/api/v1/user/getUser/${participantId}`);
            const userData = await userRes.json();
            console.log(userData);
            return userData.data ? { username: userData.data.username, collegeId: userData.data.collegeId } : null;
          })
        );

        // Filter out any failed requests (null values)
        setParticipants(users.filter((user) => user !== null));
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setLoading(false);
      }
    }

    if (eventId) {
      fetchParticipants();
    }
  }, [eventId]);

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold">Participants</h2>
      {loading ? (
        <p>Loading participants...</p>
      ) : participants.length === 0 ? (
        <p>No participants registered.</p>
      ) : (
        <ul className="ml-5 list-disc">
          {participants.map((participant, index) => (
            <li key={index} className="mt-2">
              <strong>{participant.username}</strong> - {participant.collegeId}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
