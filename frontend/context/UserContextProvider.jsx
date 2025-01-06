"use client";

import React, { useEffect } from "react";
import UserContext from "./UserContext";
import { fetchCurrentUser } from "@/utils";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchCurrentUser() 
        // if (response.ok) {
          setUser(response);
        // }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
