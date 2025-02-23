"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { AuthModal } from "@/components";
import ComboboxSelector from "@/components/ComboboxSelector";
import { departments, institutes } from "@/constants";

const EditProfilePage = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [iconColor, setIconColor] = useState("");
  // const [formData, setFormData] = useState({
  //   username: "",
  //   photo: "",
  //   contactNumber: "",
  //   institute: "",
  //   department: "",
  //   designation: "",
  // });

  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [institute, setInstitute] = useState("");
  const [department, setDepartment] = useState("");
  const [photo, setPhoto] = useState();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  useEffect(() => {
    // setFormData({
    //   username: user?.username,
    //   // photo: user?.photo,
    //   contactNumber: user?.contactNumber || "",
    //   // institute: user?.institute,
    //   department: user?.department || "",
    //   designation: user?.designation || "",
    //   institute: user?.institute || "",
    // });
    // router.refresh();

    setUsername(user?.username);
    setContactNumber(user?.contactNumber || "");
    setDesignation(user?.designation || "");
    setInstitute(user?.institute || "");
    setDepartment(user?.department || "");
  }, [user]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("contactNumber", contactNumber);
    formData.append("designation", designation);
    formData.append("institute", institute);
    formData.append("department", department);

    const res = await fetch(
      `http://localhost:8001/api/v1/user/updateUser/${user._id}`,
      {
        method: "PATCH",
        body: formData,
        credentials: "include",
      }
    );

    if (res.ok) {
      setModalTitle("Profile Updated!");
      setIconColor("bg-blue-500");
      setShowModal(true);
    } else {
      setModalTitle("Profile Update Unsuccessful.");
      setIconColor("bg-red-500");
      setShowModal(true);
    }
    // console.log(res);
    // .then((res) => {
    //   res.json();
    //   console.log(res);
    //   if (res.ok) {
    //     setModalTitle("Profile Updated!");
    //     setIconColor("bg-blue-500");
    //     setShowModal(true);
    //     // setTimeout(() => router.push("/dashboard"), 2000);
    //   } else {
    //     setModalTitle("Profile Update Unsuccessful!");
    //     setIconColor("bg-red-500");
    //     setShowModal(true);
    //   }
    // })
    // .catch((error) => {
    //   console.log(error.message);
    // });
  };

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="photo"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="institute"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="institute"
            >
              Institute
            </label>
            <div className="mb-4">
              <ComboboxSelector
                value={institute}
                onChange={(e) => setInstitute(e)}
                options={institutes}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="department"
            >
              Department
            </label>
            <div>
              <ComboboxSelector
                value={department}
                onChange={(e) => setDepartment(e)}
                options={departments}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <AuthModal
        isVisible={showModal}
        title={modalTitle}
        iconColor={iconColor}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default EditProfilePage;
