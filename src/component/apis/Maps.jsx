import React from "react";
import { useJsApiLoader, GoogleMap, } from "@react-google-maps/api";
import { Box, rem } from '@mantine/core';


const clave = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

export const Maps = ({ center = { lat: 31.76904, lng: 35.21633 }, zoom = 8, children }) => {
    
        const { isLoaded, loadError } = useJsApiLoader({
          googleMapsApiKey: clave,
          libraries,
        });
      
        if (loadError) {
          return <div>Error al cargar el mapa</div>;
        }
      
        if (!isLoaded) {
          return <div>Cargando el mapa...</div>;
        }
  return (
  
    <GoogleMap
   
      center={center}
      zoom={zoom}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {children}
    </GoogleMap>
    
  );
};

export default Maps;
