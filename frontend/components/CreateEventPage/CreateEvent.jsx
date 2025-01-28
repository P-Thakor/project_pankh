"use client";

import UserContext from "@/context/UserContext";
import { convertToISO } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "..";

const CreateEvent = () => {
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [eventPoster, setEventPoster] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [iconColor, setIconColor] = useState("bg-blue-500");

  const router = useRouter();

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);

    if (!isMultipleDays) {
      setEndDate(selectedDate); // Auto-set end date for single-day events
    }
  };

  const handleEndDateChange = (e) => {
    if (isMultipleDays) {
      setEndDate(e.target.value);
    }
  };

  const handleStartTimeChange = (e) => {
    const selectedTime = e.target.value;
    setStartTime(selectedTime);

    // If it's a single-day event, ensure end time is not earlier than start time
    if (!isMultipleDays && endTime && selectedTime > endTime) {
      setEndTime(selectedTime);
    }
  };

  const handleEndTimeChange = (e) => {
    const selectedTime = e.target.value;

    // Ensure End Time is greater than Start Time for single-day events
    if (!isMultipleDays && selectedTime <= startTime) {
      alert("End Time must be later than Start Time.");
      setEndTime(startTime); // Reset to Start Time to force correction
    } else {
      setEndTime(selectedTime);
    }
  };

  const toggleEventDuration = (multipleDays) => {
    setIsMultipleDays(multipleDays);

    if (!multipleDays) {
      setEndDate(startDate); // Ensure end date is same as start date
      if (endTime < startTime) {
        setEndTime(startTime); // Ensure valid end time
      }
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();

    const beginEvent = convertToISO(startDate, startTime);
    const endEvent = convertToISO(endDate, endTime);

    console.log(beginEvent, endEvent);

    const formData = new FormData();
    formData.append("coverImage", eventPoster);
    formData.append("name", name);
    formData.append("locations", location);
    formData.append("startDate", beginEvent);
    formData.append("endDate", endEvent);
    formData.append("startTime", beginEvent);
    formData.append("endTime", endEvent);
    formData.append("description", eventDescription);
    formData.append("email", email);
    formData.append("contactNumber", contactNumber);

    fetch("http://localhost:8000/api/v1/event/createEvent", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setModalTitle("Event Created Successfully.");
          setMessage("Looking forward to the experience!");
          setIsModalVisible(true);
        } else {
          setModalTitle("Event Creation Unsuccessful.");
          setIconColor("bg-red-500");
          setIsModalVisible(true);
          console.log("Error:", response);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <section className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-8 text-3xl font-semibold text-center">
            {/* Create Event */}
            <span className="text-black">Create</span>{" "}
            <span className="text-blue-600">Event</span>
          </h1>

          <form onSubmit={handleCreateEvent}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Event Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Venue<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Event Venue"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center col-span-2 space-x-4">
                <div>
                  <input
                    type="radio"
                    id="single-day"
                    name="duration"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={!isMultipleDays}
                    onChange={() => toggleEventDuration(false)}
                  />
                  <label
                    htmlFor="single-day"
                    className="ml-2 text-sm text-gray-900"
                  >
                    Single Day
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="multiple-days"
                    name="duration"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={isMultipleDays}
                    onChange={() => toggleEventDuration(true)}
                  />
                  <label
                    htmlFor="multiple-days"
                    className="ml-2 text-sm text-gray-900"
                  >
                    Multiple Days
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  disabled={!isMultipleDays}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time<span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time<span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={endTime}
                  min={startTime} // Set min to prevent selecting an invalid time
                  onChange={handleEndTimeChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Event Description<span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Cognizance is a tech fest organized by the students of CHARUSAT"
                className="w-full px-4 py-2 mb-6 border border-gray-300 rounded"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Poster
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEventPoster(e.target.files[0])}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
              />
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold">
                {/* Contact Person */}
                <span className="text-black">Contact</span>{" "}
                <span className="text-blue-600">Person</span>
              </h2>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <label className="block text-sm font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create event
            </button>
          </form>
        </div>
      </section>
      <AuthModal
        isVisible={isModalVisible}
        title={modalTitle}
        message={message}
        iconColor={iconColor}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default CreateEvent;
