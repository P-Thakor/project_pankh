"use client";

import UserContext from "@/context/UserContext";
import { convertToISO } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "..";
import { TailSpin } from "react-loader-spinner";

const CreateEvent = () => {
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPoster, setEventPoster] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  // New state variables for the "Other Emails" feature.
  const [otherEmailInput, setOtherEmailInput] = useState("");
  const [otherEmails, setOtherEmails] = useState([]);

  const router = useRouter();

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);

    // For a single-day event, auto-set the end date to the same value.
    if (!isMultipleDays) {
      setEndDate(selectedDate);
    }

    // Optionally, set the registration deadline date to the start date by default.
    setDeadlineDate(selectedDate);
  };

  const handleEndDateChange = (e) => {
    if (isMultipleDays) {
      setEndDate(e.target.value);
    }
  };

  const handleStartTimeChange = (e) => {
    const selectedTime = e.target.value;
    setStartTime(selectedTime);

    // For single-day events, ensure end time is not earlier than start time.
    if (!isMultipleDays && endTime && selectedTime > endTime) {
      setEndTime(selectedTime);
    }

    // Optionally, set the registration deadline time to the start time by default.
    setDeadlineTime(selectedTime);
  };

  const handleEndTimeChange = (e) => {
    const selectedTime = e.target.value;

    // Ensure End Time is greater than Start Time for single-day events.
    if (!isMultipleDays && selectedTime <= startTime) {
      alert("End Time must be later than Start Time.");
      setEndTime(startTime); // Reset to Start Time to force correction.
    } else {
      setEndTime(selectedTime);
    }
  };

  const toggleEventDuration = (multipleDays) => {
    setIsMultipleDays(multipleDays);

    if (!multipleDays) {
      // For single-day events, set the end date to the same as the start date.
      setEndDate(startDate);
      if (endTime < startTime) {
        setEndTime(startTime); // Ensure valid end time.
      }
    }
  };

  // Handler for adding an email to the "otherEmails" array.
  const handleAddEmail = () => {
    const trimmedEmail = otherEmailInput.trim();
    if (trimmedEmail) {
      // Optionally, you can add more robust email validation here.
      setOtherEmails((prevEmails) => [...prevEmails, trimmedEmail]);
      setOtherEmailInput("");
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    setLoading(true);

    const beginEvent = convertToISO(startDate, startTime);
    const endEvent = convertToISO(endDate, endTime);

    console.log("Event Start:", beginEvent, "Event End:", endEvent);

    // Create a Registration object with the converted deadline value.
    const Registration = {
      deadline: convertToISO(deadlineDate, deadlineTime),
    };
    console.log("Registration:", Registration);

    const formData = new FormData();
    formData.append("coverImage", eventPoster);
    formData.append("name", name);
    formData.append("locations", location);
    formData.append("startDate", beginEvent);
    formData.append("endDate", endEvent);
    formData.append("startTime", beginEvent);
    formData.append("endTime", endEvent);
    formData.append("description", eventDescription);
    formData.append("Registration[deadline]", Registration.deadline);
    otherEmails.forEach((email) => formData.append("otherEmail[]", email));

    fetch("http://localhost:8001/api/v1/event/createEvent", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setModalTitle("Event Created Successfully.");
          setMessage("Looking forward to the experience!");
          setIconColor("bg-green-500");
          setIsModalVisible(true);
          response.json().then((data) => {
            console.log(data);
            router.push(`/view-event/${data.data._id}`);
          });
        } else {
          setModalTitle("Event Creation Unsuccessful.");
          response.json().then((data) => {
            setMessage(data.message);
            console.log(data);
          });
          if (response.status === 403) {
            setMessage("You are not authorized to create events.");
          }
          setIconColor("bg-red-500");
          setIsModalVisible(true);
          console.log("Error:", response);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <section className="flex items-center justify-center w-full min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-8 text-3xl font-semibold text-center text-blue-600">
            Create Event
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
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
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
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
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
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
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
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
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
                  onChange={handleStartTimeChange}
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
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
                  min={startTime} // Prevent selecting an invalid time
                  onChange={handleEndTimeChange}
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-6 mt-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Deadline Date
                </label>
                <input
                  type="date"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
                  defaultValue={startDate}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deadline Time
                </label>
                <input
                  type="time"
                  value={deadlineTime}
                  max={startTime} // Prevent selecting an invalid time
                  onChange={(e) => setDeadlineTime(e.target.value)}
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
                  defaultValue={startTime}
                  required
                />
              </div>
            </div>

            {/* New Field for Other Emails */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Emails
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={otherEmailInput}
                  onChange={(e) => setOtherEmailInput(e.target.value)}
                  className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="px-4 py-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Add
                </button>
              </div>
              {/* Display the list of added emails */}
              {otherEmails.length > 0 && (
                <ul className="mb-4 list-disc pl-5 text-sm text-gray-700">
                  {otherEmails.map((email, index) => (
                    <li key={index}>{email}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Event Description<span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Cognizance is a tech fest organized by the students of CHARUSAT"
                className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
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
                className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <TailSpin type="Tailspin" color="#FFFFFF" height={25} width={25} />
              ) : (
                "Create Event"
              )}
            </button>
          </form>
        </div>
      </section>
      <AuthModal
        isVisible={isModalVisible}
        title={modalTitle}
        message={message}
        iconColor={iconColor}
        onClose={() => {
          setIsModalVisible(false);
          if (modalTitle === "Event Created Successfully.") {
            router.push("/home");
          }
        }}
      />
    </>
  );
};

export default CreateEvent;
