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
  import { queryGetMulti } from "../../../data/data.js";

  
  // import { User } from "../../context/user/User";
  
  
const apiBaseUrl = import.meta.env.VITE_API_URL ||"http://localhost:4000/"
  // habria que limitar la posinilidad de enviar mas de una ves
  // o borrar una ves que enviaste el precio
  
  export const PricesOfPassenger = () => {
    const { user, isAuthenticated } = useAuth0();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
      const fetchData = async () => {

const route = `${apiBaseUrl}PricesOneWay`
const endpoint= user.sub
        const data = await queryGetMulti(route , endpoint);
        if(!data){return}
        setData(data);
        setIsLoading(false)
      };

      useEffect(() => {
        fetchData();
      }, [user.sub]);
    
      // console.log("2",data);


      if (isLoading) {
        return <Text>wait</Text>;
      }
if (data.length < 1 ) {
  return <Text>no trip</Text>;
}
    return (
      <>
        <Container size="25rem" my="-20px">
          {data.map((data, index) => (
            <Paper
              key={index}
              shadow="md"
              withBorder
              p="xl"
              radius="xl"
              style={{ marginBottom: "20px" }}
              
            component="form"
          
               
              >


                <Stack spacing="lg" justify="center">
                <Title order={2}>
                   price of drivers
                
                  
                </Title>
                <Text>company: {data.company_name}</Text>
                <Text>mail: {data.company_mail}</Text>
                <Text>tel: {data.company_cell}</Text>
                <Text>price: {data.driver_price}</Text>
                <Text>Departure date: {data.departure_date}</Text>
                 <Text>Departure hour: {data.departure_hour}</Text>

                 <Text>From: {data.from_address}</Text>
                <Text>TO: {data.to_address}</Text> 
        
             
                </Stack>
            </Paper>
          ))}
        </Container>
        {/* <Code block mt="xl">
          {JSON.stringify(trips, null, 2)}
        </Code> */}
      </>
    );
  };
  