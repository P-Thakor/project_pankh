"use client";

import React, { useState } from "react";

export default function CancelEventModal({
  isOpen,
  onClose,
  eventId,
  onCancel,
}) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError("Please provide a reason for cancellation.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Send cancellation request to the backend
      const response = await fetch("/api/v1/event/cancelEvent", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          cancellationReason: reason,
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        setError(responseData.message || "Failed to cancel event");
        // Call onCancel with success=false
        onCancel(eventId, reason, responseData.message || "Failed to cancel event. Please try again.", false);
      } else {
        // Call onCancel with success=true
        onCancel(eventId, reason, "Event cancelled successfully.", true);
      }
      
    } catch (err) {
      const errorMessage = err.message || "An error occurred while cancelling the event";
      setError(errorMessage);
      onCancel(eventId, reason, errorMessage, false);
    } finally {
      setIsSubmitting(false);
      setReason(""); // Clear the reason input
      onClose(); // Close the modal after submission
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h2 className="text-xl font-bold mb-4">Cancel Event</h2>

          <p className="mb-4 text-red-600">
            Are you sure you want to cancel this event? This action cannot be
            undone.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="cancellationReason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason for cancellation
              </label>
              <textarea
                id="cancellationReason"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for cancelling this event"
                required
              />
            </div>

            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Cancellation"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}