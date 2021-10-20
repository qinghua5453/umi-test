import React, { useState, useEffect, useContext } from 'react';

const BaseContext = React.createContext();
const BaseProvider = ({ children }) => {
  const [menuItem, setMenuItem] = useState({});
  const value = {
    menuItem,
    setMenuItem,
  };
  return <BaseContext.Provider value={value}>{children}</BaseContext.Provider>;
};

export { BaseProvider, BaseContext };
