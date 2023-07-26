// const onLoad = useCallback((map) => (mapRef.current = map), []);

// const fetchDirections = (originLocation) => {
//   if (!originLocation) return;

//   const service = new google.maps.DirectionsService();
//   service.route(
//     {
//       originLocation,
//       destinationLocation,
//       travelMode: google.maps.TravelMode.DRIVING,
//     },
//     (result, status) => {
//       if (status === "OK" && result) {
//         setDestinationLocation(result);
//       }
//     }
//   );
// };

import { useForm } from "@mantine/form";
import { AutocomletInputAdress } from "../apis/AutocomletInputAdress";
import { Maps } from "../apis/Maps";
import {
  Button,
  Group,
  Text,
  TextInput,
  NumberInput,
  Box,
  Grid,
} from "@mantine/core";

import {
  DirectionsService,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  GoogleMap,
} from "@react-google-maps/api";
import { useState, useRef, useMemo, useEffect } from "react";

export function FormOneWay() {
  const form = useForm({
    initialValues: {
      number_of_passengers: "",
      // from_region: "",
      // from_street: "",
      from_address: "",

      to_address: "",
      // to_city: "",
      // to_street: "",
      departure_date: "",
      departure_hour: "",
    },
  });

  const initialCenter = { lat: 31.76904, lng: 35.21633 };
  const [center, setCenter] = useState(initialCenter)
  const [directionResponse, setDirectionResponse] = useState(null);
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  useEffect(() => {
    // Set the center to initialCenter when the component mounts
    setCenter(initialCenter);
  }, []);

  const fetchDirection = async (originRef) => {
    if (!originLocation || !destinationLocation) {
      return;
    }
    const DirectionsService = new google.maps.DirectionsService();
    const result = await DirectionsService.route({
      origin: originLocation, // Use 'origin' instead of 'originRef'
      destination: destinationLocation, // Use 'destination' instead of 'destinationRef'
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(result);
  };
  const originRef = useRef(); // Asignar la referencia
  const destinationRef = useRef(); // Asignar la referencia

  useEffect(() => {
    // Call fetchDirection whenever originLocation or destinationLocation is updated
    fetchDirection();
  }, [originLocation, destinationLocation]);

  const handleOriginPlaceChanged = (place) => {
    !place.formatted_address
      ? setOriginLocation(null)
      : form.setFieldValue("from_address", place.formatted_address); // Actualizar el valor del formulario
    setOriginLocation(place.geometry.location); // Actualizar la ubicación de origen
   
  };

  const handleDestinationPlaceChanged = (place) => {
    !place.formatted_address
      ? setOriginLocation(null)
      : form.setFieldValue("to_address", place.formatted_address); // Actualizar el valor del formulario
    setDestinationLocation(place.geometry.location);
  
  };
  

  return (
    <Grid grow>
      <Grid.Col span={6}>
      <Maps center={center}> {/* Use the center state for the center of the map */}
          {directionResponse && <DirectionsRenderer directions={directionResponse} />}
          {originLocation && <Marker position={originLocation} />}
          {destinationLocation && <Marker position={destinationLocation} />}
        </Maps>
      </Grid.Col>
      <Grid.Col span={6}>
        <Box
          component="form"
          maw={400}
          mx="auto"
          onSubmit={((e) => {
            e.preventDefault()
            console.log(form.values);
          })}
          
        >
          <NumberInput
            label="number of passengers"
            placeholder="numberof passengers"
            withAsterisk
            {...form.getInputProps("number_of_passengers")}
          />

          <AutocomletInputAdress
            label="from origin"
            placeholder="Enter from address"
            ref={originRef}
            value={form.values.from_address}
            onChange={(value) => form.setFieldValue("from_address", value)}
            onPlaceChanged={handleOriginPlaceChanged}
          />

          <AutocomletInputAdress
            label="destination"
            placeholder="Enter to address"
            ref={destinationRef}
            value={form.values.to_address}
            onChange={(value) => form.setFieldValue("to_address", value)}
            onPlaceChanged={handleDestinationPlaceChanged}
          />

          <TextInput
            label="departure_date"
            placeholder="departure_date"
            withAsterisk
            mt="md"
            {...form.getInputProps("departure_date")}
          />
          <TextInput
            label="departure_hour"
            placeholder="departure_hour"
            withAsterisk
            mt="md"
            {...form.getInputProps("departure_hour")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </Box>
      </Grid.Col>
    </Grid>
  );
}
