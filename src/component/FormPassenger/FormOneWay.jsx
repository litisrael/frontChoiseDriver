

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
      coordinates_origin:"",
      coordinates_destine: ""
    },
  });

  const initialCenter = { lat: 31.76904, lng: 35.21633 };
  const [center, setCenter] = useState(initialCenter)
  const [directionResponse, setDirectionResponse] = useState(null);
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Set the center to initialCenter when the component mounts
    setCenter(initialCenter);
  }, []);
// ... (previous code remains unchanged)

const fetchDirection = async () => {
  if (!originLocation || !destinationLocation) {
    return;
  }

  const DirectionsService = new google.maps.DirectionsService();
  const result = await DirectionsService.route({
    origin: originLocation,
    destination: destinationLocation,
    travelMode: google.maps.TravelMode.DRIVING,
  });

  setDirectionResponse(result);
  setDistance(result.routes[0].legs[0].distance.text)
   setDuration(result.routes[0].legs[0].duration.text)

  // Extract LatLng of the origin and destination
  if (result?.routes?.length > 0) {
    const route = result.routes[0];
    console.log(route,"---------------------------------------------------------")
    const originLatLng = route.legs[0].start_location.toJSON();
    const destinationLatLng = route.legs[route.legs.length - 1].end_location.toJSON();

    // Update the form fields with the LatLng values
    form.setFieldValue("coordinates_origin", `${originLatLng.lat},${originLatLng.lng}`);
    form.setFieldValue("coordinates_destine", `${destinationLatLng.lat},${destinationLatLng.lng}`);
  }
};

// ... (rest of the code remains unchanged)

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
      <Text fz="lg">distance {distance}</Text>
      <Text fz="lg">duration approximate {duration}</Text>
    </Grid>
  );
}
