"use client";

import UserContext from "@/context/UserContext";
import { convertToISO } from "@/utils";
import { DivideIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
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

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
    if (!isMultipleDays) {
      setEndDate(e.target.value);
    }
  };

  const handleEndDateChange = (e) => {
    if (e.target.value > startDate) {
      setEndDate(e.target.value);
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
    // formData.append("externalLink", externalLink);

    fetch("http://localhost:8000/api/v1/event/createEvent", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // alert("Event created successfully.");
          setModalTitle("Event Created Successfully.");
          setMessage("Looking forward to the experience!");
          setIsModalVisible(true);
        } else {
          // alert("Event creation failed.");
          setModalTitle("Event Creation Unsuccessful.");
          // setMessage(error);
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
            Create Event
          </h1>
          <form onSubmit={handleCreateEvent}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
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
                  Event Venue
                </label>
                <input
                  type="text"
                  placeholder="Enter Event Venue"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex items-center col-span-2 space-x-4">
                <div>
                  <input
                    type="checkbox"
                    id="single-day"
                    name="duration"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={!isMultipleDays}
                    onChange={() => setIsMultipleDays(false)}
                  />
                  <label
                    htmlFor="single-day"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Single Day
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="multiple-days"
                    name="duration"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={isMultipleDays}
                    onChange={() => setIsMultipleDays(true)}
                  />
                  <label
                    htmlFor="multiple-days"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Multiple Days
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleDateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>

              {isMultipleDays && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
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
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold">Event Description</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Poster
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEventPoster(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Description
                </label>
                <input
                  placeholder="Cognizance is a tech fest organized by the students of CHARUSAT"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold">Contact</h2>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
