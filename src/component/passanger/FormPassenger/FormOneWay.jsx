
import { useForm } from "@mantine/form";
import { AutoCompleteInputAddress } from "../../../context/apis/AutocomletInputAdress";
import { Maps } from "../../../context/apis/Maps";
import { InputTime } from "../../kitComponent/InputTime";
import { DateInput } from '@mantine/dates';
import {
  findOrCreatePassengerAccount,
  createPassenger,
  updatePassenger,
  prepareReservationData,
} from "./reservation.js";
import {
  Button,
  Group,
  Text,
  TextInput,
  NumberInput,
  Box,
  Paper,
  Grid,
  Modal,
  Alert
} from "@mantine/core";

import {
  DirectionsService,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  GoogleMap,
} from "@react-google-maps/api";
import { useState, useRef, useMemo, useEffect } from "react";

import { LoginToggle } from "../../loginToggle";
import { User } from "../../User";
import { useAuth0 } from "@auth0/auth0-react";


// const apiBaseUrl = import.meta.env.VITE_API_URL ||"http://localhost:4000/"

let responseData = null
export function FormOneWay() {
  const { user, isAuthenticated } = useAuth0();


  if (!isAuthenticated) {
    return (
      <Text>
        Please log in to access the form. <LoginToggle />
      </Text>
    );
  }
  
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const FormPassenger = useForm({
    initialValues: {
      passenger_name: user.name,
      passenger_mail: user.email,
      passenger_cell: user.phone_number,
      auth_id: user.sub,
    },
  });

  const formOneWay = useForm({
    initialValues: {
      number_of_passengers: "",
      from_address: "",
      to_address: "",
      departure_date: "",
      departure_hour: "",
      coordinates_origin: "",
      coordinates_destine: "",
    },
  });

  const initialCenter = { lat: 31.76904, lng: 35.21633 };
  const [center, setCenter] = useState(initialCenter);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);

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
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
    
    // Extract LatLng of the origin and destination
    if (result?.routes?.length > 0) {
      const route = result.routes[0];
    

      const originLatLng = route.legs[0].start_location.toJSON();
      const destinationLatLng =
        route.legs[route.legs.length - 1].end_location.toJSON();
        const startAddress = route.legs[0].start_address
        const endAddress = route.legs[0].end_address

      // Update the form fields with the LatLng values
      formOneWay.setFieldValue(
        "coordinates_origin",
        `${originLatLng.lat},${originLatLng.lng}`
      );
      
      formOneWay.setFieldValue(
        "coordinates_destine",
        `${destinationLatLng.lat},${destinationLatLng.lng}`
        );
   
        formOneWay.setFieldValue(
          "from_address",
          startAddress
        );
   
        formOneWay.setFieldValue(
        "to_address",
        endAddress
      );
    }
  };

  // const originRef = useRef(); // Asignar la referencia
  // const destinationRef = useRef(); // Asignar la referencia

  useEffect(() => {
    // Call fetchDirection whenever originLocation or destinationLocation is updated
    fetchDirection();
  }, [originLocation, destinationLocation]);

  const handleOriginPlaceChanged = (place) => {
    !place.formatted_address
      ? setOriginLocation(null)
      : formOneWay.setFieldValue("from_address", place.formatted_address); // Actualizar el valor del formulario
    setOriginLocation(place.geometry.location); // Actualizar la ubicación de origen
  };

  const handleDestinationPlaceChanged = (place) => {
    !place.formatted_address
      ? setOriginLocation(null)
      : formOneWay.setFieldValue("to_address", place.formatted_address); // Actualizar el valor del formulario
    setDestinationLocation(place.geometry.location);
  };

if (showSuccessAlert){
  return(
    <Alert
      color="green"
      title="¡Form successfully submitted! !"
      onClose={() => setShowSuccessAlert(false)}
      mt="md"
    >    {responseData.DriversForOneWay === 'No drivers available' ? (
      "I'm sorry, but we couldn't send your trip to any drivers at the moment."
    ) : (
      `Form successfully submitted! You will soon start receiving prices from the drivers! ${responseData.DriversForOneWay.length} driver(s) have been notified.
      You will soon start receiving prices from the drivers`
    )} </Alert>
)
}
const currentDate = new Date();
const maxDate = new Date(currentDate);
maxDate.setFullYear(currentDate.getFullYear() + 1);

  return (
    <>
      <Grid grow>
        <Grid.Col span={4}>
      <Paper shadow="md" withBorder p="xl" radius="xl">
          
          <Box
            component="form"
            maw={400}
            mx="auto"
            onSubmit={async (e) => {
              e.preventDefault();

             
               const reservationData = await findOrCreatePassengerAccount(FormPassenger, formOneWay);
console.log("res findOrCreatePassengerAccount de reservationData",reservationData);
             
const reservationRes = await fetch(
                  
                  `${window.apiBaseUrl}reservationoneway`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reservationData),
                  }
                );
                 responseData = await reservationRes.json();

          if (reservationRes.status === 200) {
            formOneWay.reset();
            FormPassenger.reset();
           setShowSuccessAlert(true);
            // setTimeout(() => {
             
            //   window.location.href = window.location.origin;
            // }, 3000); // Redirige después de 3 segundos (ajusta según tus necesidades)
          } else {
            console.error("The server responded with an error", responseData);
          }
        }}
      >


            
            <TextInput
              label="name"
              placeholder="name"
              withAsterisk
              mt="md"
              {...FormPassenger.getInputProps("passenger_name")}
            />

            <TextInput
              label="mail"
              disabled
              placeholder="mail"
              withAsterisk
              mt="md"
              {...FormPassenger.getInputProps("passenger_mail")}
            />
            <TextInput
              label="cell "
              placeholder="cell"
              withAsterisk
              mt="md"
              {...FormPassenger.getInputProps("passenger_cell")}
            />

            <NumberInput
              label="number of passengers"
              placeholder="numberof passengers"
              max={100}
              min={9}
              withAsterisk
              {...formOneWay.getInputProps("number_of_passengers")}
            />
            <AutoCompleteInputAddress
              label="from origin"
              placeholder="Enter from address"
              // ref={originRef}
              value={formOneWay.values.from_address}
              onChange={(value) =>
                formOneWay.setFieldValue("from_address", value)
              }
              onPlaceChanged={handleOriginPlaceChanged}
            />
            <AutoCompleteInputAddress
              label="destination"
              placeholder="Enter to address"
              // ref={destinationRef}
              value={formOneWay.values.to_address}
              onChange={(value) =>
                formOneWay.setFieldValue("to_address", value)
              }
              onPlaceChanged={handleDestinationPlaceChanged}
            />
      
            <DateInput
            minDate={new Date()}
              label="departure_date"
              placeholder="departure_date"
              
      maxDate={maxDate}
              withAsterisk
              mt="md"
              {...formOneWay.getInputProps("departure_date")}
            />
            <InputTime
              label="departure_hour"
              placeholder="departure_hour"
              withAsterisk
              mt="md"
              {...formOneWay.getInputProps("departure_hour")}
            />
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Box>
        </Paper>
        </Grid.Col>

        <Grid.Col span={8}>
          <Maps center={center}>
            {" "}
            {/* Use the center state for the center of the map */}
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
            {originLocation && <Marker position={originLocation} />}
            {destinationLocation && <Marker position={destinationLocation} />}
          </Maps>
          
        </Grid.Col>

      </Grid>
      <Box justify="center" align="center" direction="row">
        <Text fz="lg">distance {distance}</Text>
        <Text fz="lg">duration approximate {duration}</Text>
      </Box>
   
    </>
  );
}
