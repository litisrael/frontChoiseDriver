import {
  Button,
  Container,
  TextInput,
  MultiSelect,
  NumberInput,
  Checkbox,
  Title,
  Stack,
  SimpleGrid,
  Code,
  Text,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getDataById, postOfferPriceDriverOneWay} from "../../../data/data.js";


const apiBaseUrl = import.meta.env.VITE_API_URL ||"http://localhost:4000/"

// habria que limitar la posinilidad de enviar mas de una ves
// o borrar una ves que enviaste el precio ya agregue una columna para verificar si ya hay

export const AvailableTripsTable = () => {
  const { user, isAuthenticated } = useAuth0();

  // Verifica si el usuario está autenticado
  if (!isAuthenticated) {
    return <div>Inicia sesión para acceder al formulario.</div>;
  }

  
  
  const [trips, setTrips] = useState([]);
  const [formPrices, setFormPrices] = useState([]);
  

  if(trips.length === 0 ||trips == null){ 
    return <Text> no trips </Text>
  }
    

  useEffect(() => {
    const fetchData = async () => {
      const url = `${apiBaseUrl}GetAvailableOneWay`
      const tripsData = await getDataById(url,user.sub);
      setTrips(tripsData);
      setFormPrices(new Array(tripsData.length).fill(0));
    };

    fetchData();
  }, [user.sub]);


  

  return (
    <>
      <Container size="25rem" my="-20px">
        {trips.map((trip, index) => (
          <Paper
            key={index}
            shadow="md"
            withBorder
            p="xl"
            radius="xl"
            style={{ marginBottom: "20px" }}
            
          component="form"
        
              onSubmit={(e) => {
                e.preventDefault();
                const { id_one_way, company_name, company_id} = trip;
                const driverPrice = formPrices[index];
                
                postOfferPriceDriverOneWay(id_one_way, company_id, company_name, driverPrice);
                
              }}
            >
              <Stack spacing="lg" justify="center">
              <Title order={2}>
                Offer your price <br />
                one-way trip .
              </Title>
              <Text>Number of Passengers: {trip.number_of_passengers}</Text>
              <Text>From Address: {trip.from_address}</Text>
              <Text>To Address: {trip.to_address}</Text>
              <Text>Departure Date: {trip.departure_date}</Text>
              <Text>Day of the Week: {trip.day_week}</Text>
              <Text>Departure Hour: {trip.departure_hour}</Text>
              <Text>Passenger Name: {trip.passenger_name}</Text>
              <Text>Passenger Mail: {trip.passenger_mail}</Text>
              <Text>Passenger Cell: {trip.passenger_cell}</Text>
              <Checkbox label="I agree to the terms and conditions" />
              <NumberInput
                label="Price in shekel"
                value={formPrices[index]}
                onChange={(value) => {
                  const updatedFormPrices = [...formPrices];
                  updatedFormPrices[index] = value;
                  setFormPrices(updatedFormPrices);
                }}
              />
              <Button uppercase size="md" type="submit">
                Send Price
              </Button>
           
              </Stack>
          </Paper>
        ))}
      </Container>
      <Code block mt="xl">
        {JSON.stringify(trips, null, 2)}
      </Code>
    </>
  );
};
