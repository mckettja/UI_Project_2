import React, { createContext, useContext, useState } from 'react';
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [treatNum, setTreatNum] = useState(20);

  const updateTreatNum = (newNum) => {
    setTreatNum(newNum);
  };

  return (
    <GlobalContext.Provider value={{ treatNum, updateTreatNum }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
