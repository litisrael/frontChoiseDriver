import { useForm } from "@mantine/form";
import { AutocomletInputAdress } from "../apis/AutocomletInputAdress";
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
  Autocomplete 
 

} from "@react-google-maps/api";
import { useState } from "react";

const center = { lat: 31.76904, lng: 35.21633 };
const clave = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];


export function FormOneWay() {
    const [searchResult, setSearchResult] = useState("Result: none");
  const form = useForm({
    initialValues: {
      number_of_passengers: "",
      // from_region: "",
      // from_street: "",
      from_address: "",
      from_address1: "",
      to_address: "",
      // to_city: "",
      // to_street: "",
      departure_date: "",
      departure_hour: "",
    },
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(searchResult);
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    //    setFormattedAddress(formattedAddress);
    // setFormattedAddress(formattedAddress);
    form.setFieldValue('from_address', formattedAddress);
    setFromAddressError(false);
  } else {
    setFromAddressError(true);
    alert("Please enter text");
  }
  }
  const [mapBounds, setMapBounds] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [direction ,setdirection ]= useState()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: clave,
    libraries,
  });
  if (!isLoaded) {
    return <Text>bla</Text>;
  }

  return (
    <Grid grow>
      <Grid.Col span={6}>
        {" "}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMapBounds(map.getBounds())}
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
          <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}
        //   options={{
        //     // Opciones adicionales para el componente Autocomplete (opcional)
        //   }}
          restrictions={{ country: "IL" }}
          >
          
            <TextInput
              label="from address"
              placeholder="from_address"
              withAsterisk
              mt="md"
              value={formattedAddress}
          
        {...form.getInputProps("from_address")}
             

            />
          </Autocomplete>
          <Autocomplete>

          <TextInput
            label="to_address"
            placeholder="to_address"
            withAsterisk
            mt="md"
            // {...form.getInputProps("to_address")}
            />
            </Autocomplete>
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
          <AutocomletInputAdress
  label="from bla"
  placeholder="Enter from address"
  value={form.values.from_address1} 
  onChange={(value) => form.setFieldValue("from_address1", value)}
  onPlaceChanged={(place) => console.log("Selected place:", place)}
  mapBounds={mapBounds}
/>
 
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </Box>
      </Grid.Col>
    </Grid>

  );
}