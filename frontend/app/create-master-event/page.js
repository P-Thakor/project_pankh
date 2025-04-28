"use client";

import { AuthModal } from "@/components";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { TailSpin } from "react-loader-spinner";

const DEPARTMENTS = [
  { label: "CSE", value: "dcs" },
  { label: "CE", value: "dce" },
  { label: "IT", value: "dit" },
];

const YEARS = [1, 2, 3, 4];

const CreateMasterEventPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [eventPoster, setEventPoster] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    locations: "",
    coverImage: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const toggleSelection = (list, setList, value, isNumber = false) => {
    const val = isNumber ? Number(value) : value;
    setList((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("locations", form.locations);
      // formData.append("departments", JSON.stringify(selectedDepartments));
      // formData.append("years", JSON.stringify(selectedYears));
      if (eventPoster) formData.append("coverImage", eventPoster);

      const response = await fetch("/api/v1/masterEvent/createMasterEvent", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setModalTitle("Submission Unsuccessful");
        setMessage(
          result.message || "An error occurred while submitting the form."
        );
        setIconColor("bg-red-500");
        setIsModalVisible(true);
      }

      setModalTitle("Event Created Successfully.");
      setMessage("Your master event has been created.");
      setIconColor("bg-green-500");
      setIsModalVisible(true);
      setForm({ name: "", description: "", locations: "", coverImage: "" });
      setSelectedDepartments([]);
      setSelectedYears([]);
      setEventPoster(null);
    } catch (error) {
      setModalTitle("Submission Unsuccessful");
      setMessage(
        error.message || "An error occurred while submitting the form."
      );
      setIconColor("bg-red-500");
      setIsModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex items-center justify-center w-full min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-8 text-3xl font-semibold text-center text-blue-600">
            Create Master Event
          </h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Event Title"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  // required
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
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
                  required
                  placeholder="Location"
                  className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Event Description<span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Description"
                className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Register Students
              </label>
              <div className="flex mt-2 space-x-4">
                {DEPARTMENTS.map(({ label, value }) => (
                  <div key={value}>
                    <input
                      type="checkbox"
                      id={`dept-${value}`}
                      value={value}
                      checked={selectedDepartments.includes(value)}
                      onChange={(e) =>
                        toggleSelection(
                          selectedDepartments,
                          setSelectedDepartments,
                          e.target.value
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`dept-${value}`}
                      className="ml-2 text-sm text-gray-900"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              <label className="block mt-4 text-sm font-medium text-gray-700">
                Year
              </label>
              <div className="flex mt-2 space-x-4">
                {YEARS.map((year) => (
                  <div key={year}>
                    <input
                      type="checkbox"
                      id={`year-${year}`}
                      value={year}
                      checked={selectedYears.includes(year)}
                      onChange={(e) =>
                        toggleSelection(
                          selectedYears,
                          setSelectedYears,
                          e.target.value,
                          true
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`year-${year}`}
                      className="ml-2 text-sm text-gray-900"
                    >
                      {year}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Poster{" "}
                <span className="text-gray-500">(size limit: 10MB)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEventPoster(e.target.files[0])}
                className="w-full p-3 mb-4 text-sm border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? (
                <TailSpin color="#FFFFFF" height={25} width={25} />
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

export default CreateMasterEventPage;
