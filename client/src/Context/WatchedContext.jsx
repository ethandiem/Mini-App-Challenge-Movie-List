import React, { createContext, useState } from 'react';

// Create the context
export const WatchedContext = createContext();

// Create the provider component
export const WatchedProvider = ({ children }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  return (
    <WatchedContext.Provider value={{ watchedMovies, setWatchedMovies }}>
      {children}
    </WatchedContext.Provider>
  );
};