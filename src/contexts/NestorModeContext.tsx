import React, { createContext, useContext, useState, useEffect } from "react";

interface NestorModeContextType {
  isNestorMode: boolean;
  toggleNestorMode: () => void;
}

const NestorModeContext = createContext<NestorModeContextType>({
  isNestorMode: false,
  toggleNestorMode: () => {},
});

export const useNestorMode = () => useContext(NestorModeContext);

export const NestorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNestorMode, setIsNestorMode] = useState(false);

  const toggleNestorMode = () => setIsNestorMode((prev) => !prev);

  useEffect(() => {
    if (isNestorMode) {
      document.documentElement.classList.add("nestor-dark");
    } else {
      document.documentElement.classList.remove("nestor-dark");
    }
  }, [isNestorMode]);

  return (
    <NestorModeContext.Provider value={{ isNestorMode, toggleNestorMode }}>
      {children}
    </NestorModeContext.Provider>
  );
};
