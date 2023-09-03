/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import React from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    // Retrieve the user from local storage initially
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
