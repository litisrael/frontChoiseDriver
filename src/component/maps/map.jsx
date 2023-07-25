import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";

export default function Map() {
 

  const [originLocation, setOriginLocation] = useState();
  const [destinationLocation, setDestinationLocation] = useState();
  const mapRef = useRef();
  const center = useMemo(() => ( { lat: 31.76904, lng: 35.21633 }), []);
  
  

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const fetchDirections = (originLocation) => {
    if (!originLocation) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        originLocation,
        destinationLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDestinationLocation(result);
        }
      }
    );
  };

  return (
    
        <Places
          setOffice={(position) => {
            setOriginLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!originLocation && <p>Enter the address of your office.</p>}
        {destinationLocation && <Distance leg={destinationLocation.routes[0].legs[0]} />}
    
   
        <GoogleMap zoom={10} center={center} options={options} onLoad={onLoad}>
          // fetchDirections(house);
        </GoogleMap>
     
  );
}