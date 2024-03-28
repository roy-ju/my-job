/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext } from 'react';

interface ScrollPositionContextProps {
  scrollPosition: number;
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

const ScrollPositionContext = createContext<ScrollPositionContextProps>({
  scrollPosition: 0,
  setScrollPosition: () => {},
});

export const ScrollPositionProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <ScrollPositionContext.Provider value={{ scrollPosition, setScrollPosition }}>
      {children}
    </ScrollPositionContext.Provider>
  );
};

export const useScrollPosition = () => useContext(ScrollPositionContext);
