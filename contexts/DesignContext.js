import { createContext, useState } from 'react';

export const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  const [selectedDesign, setSelectedDesign] = useState('modern');

  return (
    <DesignContext.Provider value={{ selectedDesign, setSelectedDesign }}>
      {children}
    </DesignContext.Provider>
  );
}; 