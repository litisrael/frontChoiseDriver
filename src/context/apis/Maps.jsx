
import { useState, useMemo, useCallback, useRef } from "react";
import {  GoogleMap,Marker } from "@react-google-maps/api";
import { Container } from '@mantine/core';

import { useMediaQuery } from "@mantine/hooks";


export const Maps = ({ center = { lat: 31.76904, lng: 35.21633 }, zoom = 8, children,
}) => {
  const isMobile = useMediaQuery("(max-width:574px)"); // Verifica si es un dispositivo móvil
  const width = isMobile ? "100%" : "100%";
  const height = isMobile ? "400px" : "100%"; 
  const options = useMemo(
    () => ({
      mapId: "b430ba23dd1825ca",
      disableDefaultUI: true,
      clickableIcons: false,
      zoomControl: false,
    }),
    []
  );

  const mapContainerStyle = {
    width,
    height, // Valor por defecto de la altura
    borderRadius: "15px",
  };
  return (
   
    <GoogleMap
      center={center}
      zoom={zoom}
      mapContainerStyle={mapContainerStyle}
      options={options}
    >
      {children}

    </GoogleMap>
   
  );
};

export default Maps;
