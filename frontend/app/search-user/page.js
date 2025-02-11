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
      <div className="flex flex-col items-center w-full min-h-screen p-6 bg-white rounded-lg shadow-lg md:items-start">
        <h2 className="mb-4 text-lg font-bold">Search User</h2>
        <form className="w-full" onSubmit={handleSearch}>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Student ID
              </label>
              <input
                className="w-full p-3 mb-4 text-sm leading-tight border border-blue-100 rounded-lg bg-blue-50 focus:outline-none"
                id="student-id"
                type="text"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <button
              className="px-4 py-2 font-bold text-white rounded bg-primaryblue hover:bg-primaryblue focus:outline-none focus:shadow-outline"
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
