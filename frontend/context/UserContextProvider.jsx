"use client";

import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { fetchCurrentUser } from "@/utils";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetchCurrentUser() 
  //       // if (response.ok) {
  //         setUser(response);
  //       // }
  //     } catch (error) {
  //       console.error('Failed to fetch user:', error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const loginUser = (userData) => {
    setUser(userData);
  }

  const logoutUser = () => {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
