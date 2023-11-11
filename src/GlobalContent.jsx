import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [treatNum, setTreatNum] = useState(20);
  const [moodIndex, setMoodIndex] = useState(40); 

  const updateTreatNum = (newNum) => {
    setTreatNum(newNum);
  };

  const updateMoodIndex = (newIndex) => {
    setMoodIndex(newIndex);
  };

  return (
    <GlobalContext.Provider value={{ treatNum, updateTreatNum, moodIndex, updateMoodIndex }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
