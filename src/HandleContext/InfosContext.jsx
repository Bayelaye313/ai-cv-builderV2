import React, { createContext, useEffect, useState } from "react";

export const InfosContext = createContext(null);

export const InfosProvider = ({ children }) => {
  const [resumeInfos, setResumeInfos] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : {};
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(resumeInfos));
  }, [resumeInfos]);

  return (
    <InfosContext.Provider value={{ resumeInfos, setResumeInfos }}>
      {children}
    </InfosContext.Provider>
  );
};
