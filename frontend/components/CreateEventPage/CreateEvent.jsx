"use client";

import React, { useState } from "react";

const CreateEvent = () => {
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
    if (!isMultipleDays) {
      setEndDate(e.target.value);
    }
  };

  const handleEndDateChange = (e) => {
    if (e.target.value >startDate) {
      setEndDate(e.target.value);
    }
  };

  return (
    <>
      <section className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-8 text-3xl font-semibold text-center">
            Create Event
          </h1>
          <form>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Event Title"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Venue
                </label>
                <input
                  type="text"
                  placeholder="Enter Event Venue"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </form>

          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">Event Description</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Image
              </label>
              <input
                type="file"
                className="block w-full mt-1 text-sm text-gray-900 border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                placeholder="Cognizance is a tech fest organized by the students of CHARUSAT"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create event
          </button>
        </div>
      </section>
    </>
  );
};

export default CreateEvent;
