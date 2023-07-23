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
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete, 
  Circle
 

} from "@react-google-maps/api";
import { useState } from "react";

const center = { lat: 31.76904, lng: 35.21633 };
const clave = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];


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




  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: clave,
    libraries,
  });
  if (!isLoaded) {
    return <Text>loanding....</Text>;
  }

  return (
    <Grid grow>
      <Grid.Col span={6}>
     
        <GoogleMap
          center={center}
          zoom={8}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
      
        >
          <Marker position={center} />
        </GoogleMap>{" "}
      </Grid.Col>
      <Grid.Col span={6}>
        <Box
          component="form"
          maw={400}
          mx="auto"
          onSubmit={form.onSubmit(() => {console.log(form.values)})}
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
  value={form.values.from_address} 
  onChange={(value) => form.setFieldValue("from_address", value)}
  onPlaceChanged={(place) => console.log("Selected place:", place)}

/>
 
<AutocomletInputAdress
  label="destination"
//   placeholder="Enter to address"
  value={form.values.to_address} 
  onChange={(value) => form.setFieldValue("to_address", value)}
  onPlaceChanged={(place) => console.log("Selected place:", place)}

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