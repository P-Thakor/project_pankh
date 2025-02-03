"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { AuthModal } from "@/components";

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
    setContactNumber(user?.contactNumber);
    setDesignation(user?.designation);
    setInstitute(user?.institute);
    setDepartment(user?.department);
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
    console.log(res);
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              onChange={(e)=>setContactNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="institute"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={designation}
              onChange={(e)=>setDesignation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="institute"
            >
              Institute
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="institute"
              name="institute"
              // value={formData.institute}
              onChange={(e)=>setInstitute(e.target.value)}
              defaultValue={institute}
            >
              <option value="DEPSTAR">DEPSTAR</option>
              <option value="CSPIT">CSPIT</option>
              <option value="IIIM">IIIM</option>
              <option value="CMPICA">CMPICA</option>
              <option value="RPCP">RPCP</option>
              <option value="PDPIAS">PDPIAS</option>
              <option value="MTIN">MTIN</option>
              <option value="ARIP">ARIP</option>
              <option value="BDIPS">BDIPS</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <select
              id="department"
              name="department"
              // value={formData.department}
              onChange={(e)=>setDepartment(e.target.value)}
              defaultValue={department}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value=""></option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="CE">CE</option>
              <option value="EC">EC</option>
              <option value="EE">EE</option>
              <option value="MECH">MECH</option>
              <option value="CVL">CVL</option>
              <option value="AIML">AIML</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
