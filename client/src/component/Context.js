import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [coordinate, setCoordinate] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [resto, setResto] = useState([]);
  const [activities, setActivities] = useState([]);
  const [zoomIn, setZoomIn] = useState(11);

  return (
    <AppContext.Provider
      value={{
        coordinate,
        setCoordinate,
        hotels,
        setHotels,
        resto,
        setResto,
        activities,
        setActivities,
        zoomIn,
        setZoomIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
