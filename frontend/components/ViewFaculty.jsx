"use client";

import { useState, useEffect } from "react";
import { fetchUsers } from "@/utils";
import UserList from "@/components/UserList";

const ViewFaculty = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const allUsers = await fetchUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  // Automatically update the filtered users when users or selection changes.
  useEffect(() => {
    if (selectedDepartment && selectedInstitute) {
      const filtered = users.filter(
        (user) =>
          (user.role === "faculty-member" || user.role === "admin") &&
          user.department === selectedDepartment &&
          user.institute === selectedInstitute
      );
      setFilteredUsers(filtered);
    }
  }, [users, selectedDepartment, selectedInstitute]);

  const handleFaculty = (department, institute) => {
    setSelectedDepartment(department);
    setSelectedInstitute(institute);
  };

  const departments = [
    { name: "DEPSTAR CSE", department: "CSE", institute: "DEPSTAR" },
    { name: "DEPSTAR CE", department: "CE", institute: "DEPSTAR" },
    { name: "DEPSTAR IT", department: "IT", institute: "DEPSTAR" },
  ];

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-100">
      <h1 className="w-full my-6 text-2xl font-bold text-center text-blue-600 md:text-3xl">
        Select Department
      </h1>

      <div className="flex items-center justify-center flex-grow">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {departments.map((dept) => (
            <button
              key={dept.department}
              onClick={() => handleFaculty(dept.department, dept.institute)}
              className="flex items-center justify-center p-12 text-xl font-semibold text-white transition-all duration-300 bg-blue-600 shadow-md cursor-pointer rounded-2xl hover:bg-blue-700 active:scale-95"
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {selectedDepartment && selectedInstitute && (
        <div className="p-6 mt-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-center text-blue-600">
            {selectedInstitute} - {selectedDepartment} Faculty
          </h2>
          <UserList userList={filteredUsers} />
        </div>
      )}
    </div>
  );
};

export default ViewFaculty;
