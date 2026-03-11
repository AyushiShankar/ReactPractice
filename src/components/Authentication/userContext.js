import React, { createContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {

  const [toggle, setToggle] = useState(false);


  function handleToggle() {
    return setToggle((prev) => !prev);


  }

  return (
    <UserContext.Provider value={{ handleToggle, toggle }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
