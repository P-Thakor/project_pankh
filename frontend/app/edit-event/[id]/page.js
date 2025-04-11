"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { convertToISO, fetchEventById, formattedTime } from "@/utils";
import { TailSpin } from "react-loader-spinner";
import { AuthModal } from "@/components";

export default function EditEventPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deadlineTime, setDeadlineTime] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [image, setImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    summary: "",
    locations: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    coverImage: "",
    Registration: {
      deadline: "",
    },
    // externalLink: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // const res = await axios.get(`/api/v1/event/getEvent/${id}`);
        const data = await fetchEventById(id);
        setForm({
          name: data.name || "",
          description: data.description || "",
          locations: data.locations || "",
          startDate: data.startDate?.slice(0, 10) || "",
          endDate: data.endDate?.slice(0, 10) || "",
          startTime: formattedTime(data.startTime) || "",
          endTime: formattedTime(data.endTime) || "",
          coverImage: data.coverImage || "",
          Registration: {
            deadline: data.Registration?.deadline || "",
          },
          // externalLink: data.externalLink || "",
        });
        setDeadlineDate(data.Registration?.deadline?.slice(0, 10) || "");
        setDeadlineTime(formattedTime(data.Registration?.deadline) || "");
        setEvent(data);
        console.log(data.Registration.deadline);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log("form: ", form);

      const newStartTime = convertToISO(form.startDate, form.startTime);
      const newEndTime = convertToISO(form.endDate, form.endTime);
      const newDeadline = convertToISO(deadlineDate, deadlineTime);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("locations", form.locations);
      formData.append("startDate", newStartTime);
      formData.append("endDate", newEndTime);
      formData.append("startTime", newStartTime);
      formData.append("endTime", newEndTime);
      formData.append("Registration[deadline]", newDeadline);
      console.log("formData: ", formData);

      if (image) {
        formData.append("coverImage", image);
      }

      const res = await axios.patch(
        `/api/v1/event/updateEvent/${id}`,
        formData
      );
      console.log("Response: ", res.data);
      if (res.status === 200) {
        // alert("Event updated successfully!");
        setModalTitle("Event Edited Successfully.");
        setMessage("Please review the changes!");
        setIconColor("bg-green-500");
        setIsModalVisible(true);
        // router.push("/view-event/" + id);
      } else {
        setModalTitle("Event Editing Unsuccessful.");
        setMessage("Please try again!");
        setIconColor("bg-red-500");
        setIsModalVisible(true);
        // alert("Failed to update event.");
      }
    } catch (error) {
      console.error("Failed to update event:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading event...</p>;

  return (
    <>
      <section className="flex items-center justify-center w-full min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-8 text-3xl font-semibold text-center text-blue-600">
            Edit Event
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                  placeholder="Event Name"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Venue
                </label>
                <input
                  name="locations"
                  value={form.locations}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                  placeholder="Location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid items-center grid-cols-2 gap-6 mt-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Deadline Date
                </label>
                <input
                  type="date"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                  // required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deadline Time
                </label>
                <input
                  type="time"
                  value={deadlineTime}
                  max={event.startTime}
                  onChange={(e) => setDeadlineTime(e.target.value)}
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                  // required
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                placeholder="Description"
                rows="4"
              />
            </div>
            {form.coverImage && (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Poster
                </label>
                <img
                  src={form.coverImage}
                  alt="Event Cover"
                  className="justify-self-center w-1/2 object-cover mb-4"
                />
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Add New Event Poster{" "}
                <span className="text-gray-500">(size limit: 10MB)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                name="coverImage"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
              />
            </div>

            {/* <input
          name="externalLink"
          value={form.externalLink}
          onChange={handleChange}
          className="p-2 border rounded"
          placeholder="External Link"
        /> */}
            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {submitting ? (
                <TailSpin
                  type="Tailspin"
                  color="#FFFFFF"
                  height={25}
                  width={25}
                />
              ) : (
                "Save Changes"
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
          if (modalTitle == "Event Edited Successfully.") {
            router.push("/view-event/" + id);
          }
        }}
      />
    </>
  );
}
