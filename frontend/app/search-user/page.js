"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchUserPage = () => {
  const [studentId, setStudentId] = useState("");
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(studentId);
    try {
      const response = await fetch(
        `/api/v1/user/getUserByStudentId/${studentId}`
      );
      const data = await response.json();
      if (data.status === "success") {
        router.push(`/user-profile/${data.data._id}`);
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.log(error);
      alert("User not found");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-lg md:items-start min-h-screen">
        <h2 className="text-lg font-bold mb-4">Search User</h2>
        <form className="w-full" onSubmit={handleSearch}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Student ID
              </label>
              <input
                className=" block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="student-id"
                type="text"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <button
              className="bg-primaryblue hover:bg-primaryblue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchUserPage;
