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
  useJsApiLoader, GoogleMap,
} from "@react-google-maps/api";
import { useState, useRef } from "react";




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
    const [directionRes, setDirectionRes] = useState(null);
    const [originLocation, setOriginLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
  

//   const calculate= async ()=>{
//       if(originRef.current.value === "" || destinationRef.current.value === ""){
//           return
//       }
//       const DirectionsService = new google.maps.DirectionsService()
     
//       const Result = await DirectionsService.route({
//           origin: originRef.current.value,
//           destination : destinationRef.current.value,
//           travelMode : google.travelMode.DRIVING

//       })
     
//       setdirectionRes(Result)

//   }
  const originRef = useRef(); // Asignar la referencia
  const destinationRef = useRef(); // Asignar la referencia

  const handleOriginPlaceChanged = (place) => {
    form.setFieldValue("from_address", place.formatted_address); // Actualizar el valor del formulario
    setOriginLocation(place.geometry.location); // Actualizar la ubicación de origen
  };

  const handleDestinationPlaceChanged = (place) => {
    form.setFieldValue("to_address", place.formatted_address); // Actualizar el valor del formulario
    setDestinationLocation(place.geometry.location); // Actualizar la ubicación de destino
  };

  const center = { lat: 31.76904, lng: 35.21633 };
  return (
    <Grid grow>
      <Grid.Col span={6}>
        <Maps>
          <Marker position={center} />
         {/* {directionRes && <DirectionsRenderer directions={directionRes} />} */}
         {originLocation && <Marker position={originLocation} />} {/* Show the origin marker */}
          {destinationLocation && <Marker position={destinationLocation} />} {/* Show the destination marker */}
         
        </Maps>
      </Grid.Col>
      <Grid.Col span={6}>
        <Box
          component="form"
          maw={400}
          mx="auto"
          onSubmit={form.onSubmit(() => {
            calculate();
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
