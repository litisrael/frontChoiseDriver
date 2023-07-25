
import { useState, useMemo, useCallback, useRef } from "react";
import {  GoogleMap,Marker } from "@react-google-maps/api";
import { Box, rem } from '@mantine/core';



export const Maps = ({ center = { lat: 31.76904, lng: 35.21633 }, zoom = 8, children }) => {
     
  const options = useMemo(
    () => ({
      mapId: "b430ba23dd1825ca",
      disableDefaultUI: true,
      clickableIcons: false,
      zoomControl: false,
    }),
    []
  );
  return (
   
    <GoogleMap
   
      center={center}
      zoom={zoom}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={options}
    >
      {children}
    </GoogleMap>
  
  );
};

export default Maps;
