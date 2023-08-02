import { User } from "../../context/user/User";
import { useForm } from "@mantine/form";
import { AutoCompleteInputAddress } from "../apis/AutocomletInputAdress";
import { Maps } from "../apis/Maps";
import { createPassenger,updatePassenger,prepareReservationData } from "./reservation.js";
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

import { useAuth0 } from "@auth0/auth0-react";

export function FormOneWay() {
  const { user, isAuthenticated } = useAuth0();

  // Verifica si el usuario está autenticado
  if (!isAuthenticated) {
    return (
      <Text>
        Please log in to access the form. <User />{" "}
      </Text>
    );
  }

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
      // from_region: "",
      // from_street: "",
      from_address: "",

      to_address: "",
      // to_city: "",
      // to_street: "",
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

  // useEffect(() => {
  //   // Set the center to initialCenter when the component mounts
  //   setCenter(initialCenter);
  // }, []);
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
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);

    // Extract LatLng of the origin and destination
    if (result?.routes?.length > 0) {
      const route = result.routes[0];
      console.log(
        route,
        "---------------------------------------------------------"
      );
      const originLatLng = route.legs[0].start_location.toJSON();
      const destinationLatLng =
        route.legs[route.legs.length - 1].end_location.toJSON();

      // Update the form fields with the LatLng values
      formOneWay.setFieldValue(
        "coordinates_origin",
        `${originLatLng.lat},${originLatLng.lng}`
      );
      formOneWay.setFieldValue(
        "coordinates_destine",
        `${destinationLatLng.lat},${destinationLatLng.lng}`
      );
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
      : formOneWay.setFieldValue("from_address", place.formatted_address); // Actualizar el valor del formulario
    setOriginLocation(place.geometry.location); // Actualizar la ubicación de origen
  };

  const handleDestinationPlaceChanged = (place) => {
    !place.formatted_address
      ? setOriginLocation(null)
      : formOneWay.setFieldValue("to_address", place.formatted_address); // Actualizar el valor del formulario
    setDestinationLocation(place.geometry.location);
  };

  return (
    <>
      <Grid grow>
        <Grid.Col span={6}>
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
        <Grid.Col span={6}>
          <Box
            component="form"
            maw={400}
            mx="auto"
            onSubmit={async (e) => {
              e.preventDefault();
             
              console.log(formOneWay.values);
              let reservationData
              try {
                const auth0Id = FormPassenger.values.auth_id;
                console.log(auth0Id, "auth0Id");
            
                const passengerRes = await fetch(
                  `http://localhost:4000/passenger/${auth0Id}`,
                  {
                    method: "GET",
                  }
                );
            
                if (!passengerRes.ok) {
                  // Si no se encuentra el pasajero, crea uno nuevo
                  const newPassengerId = await createPassenger(FormPassenger.values);
                  const passengerData = { ...FormPassenger.values, id: newPassengerId };
                   reservationData = await prepareReservationData(
                    passengerData,
                    formOneWay
                  );
                 
                  
                  // const reservationRes = await fetch("http://localhost:4000/reservationoneway", {
                  //   method: "POST",
                  //   headers: {
                  //     "Content-Type": "application/json",
                  //   },
                  //   body: JSON.stringify(reservationData),
                  // });
                  // if (reservationRes.status === 200) {
                  //   formOneWay.reset()
                  //   FormPassenger.reset()
                  //   console.log("Success!", responseData);
                  // } else {
                  //   console.error(
                  //     "The server responded with an error",
                  //     responseData
                  //   );
                  // }

                  
                } else {
                  const passengerData = await passengerRes.json();
                 
            
                  if (
                    formOneWay.values.passenger_name === passengerData.passenger_name &&
                    formOneWay.values.passenger_mail === passengerData.passenger_mail &&
                    formOneWay.values.passenger_cell === passengerData.passenger_cell
                  ) {
                    // Si los datos del pasajero no han cambiado, preparar los datos de la reserva directamente
                    reservationData = await prepareReservationData(
                      passengerData,
                     formOneWay
                    );
                  } else {
                    // Si los datos del pasajero han cambiado, actualizar el pasajero y luego preparar los datos de la reserva
                    
                    const updatedPassengerRes = await  updatePassenger(auth0Id, FormPassenger.values);
                  
                    reservationData = await prepareReservationData(
                      updatedPassengerRes,
                      formOneWay
                    );
                  }
            
                  // Lógica para realizar la reserva con los datos preparados
                  // (por ejemplo, realizar la llamada a la API de reserva)
                }
                const reservationRes = await fetch("http://localhost:4000/reservationoneway", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(reservationData),
                });
                const responseData = await reservationRes.json();

                  if (reservationRes.status === 200) {
                    formOneWay.reset()
                    FormPassenger.reset()
                    console.log("Success!", responseData);
                  } else {
                    console.error(
                      "The server responded with an error",
                      responseData
                    );
                  }
                
              } catch (error) {
                console.log("Error:", error.message);
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
              withAsterisk
              {...formOneWay.getInputProps("number_of_passengers")}
            />
            <AutoCompleteInputAddress
              label="from origin"
              placeholder="Enter from address"
              ref={originRef}
              value={formOneWay.values.from_address}
              onChange={(value) =>
                formOneWay.setFieldValue("from_address", value)
              }
              onPlaceChanged={handleOriginPlaceChanged}
            />
            <AutoCompleteInputAddress
              label="destination"
              placeholder="Enter to address"
              ref={destinationRef}
              value={formOneWay.values.to_address}
              onChange={(value) =>
                formOneWay.setFieldValue("to_address", value)
              }
              onPlaceChanged={handleDestinationPlaceChanged}
            />
            <TextInput
              label="departure_date"
              placeholder="departure_date"
              withAsterisk
              mt="md"
              {...formOneWay.getInputProps("departure_date")}
            />
            <TextInput
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
        </Grid.Col>
      </Grid>
      <Box justify="center" align="center" direction="row">
        <Text fz="lg">distance {distance}</Text>
        <Text fz="lg">duration approximate {duration}</Text>
      </Box>
    </>
  );
}
