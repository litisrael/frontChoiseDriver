import { useState, useEffect } from "react";
import {
  Stepper,
  Button,
  Group,
  Flex,
  TextInput,
  Grid,
  Text,
  PasswordInput,
  Box,
  Code,
  Alert
} from "@mantine/core";
import { Maps } from "../../../context/apis/Maps";
import { useForm } from "@mantine/form";
import { NewFormCompany } from "./FormCompany.jsx";
import { Vehicule } from "./Vehicles.jsx";
import { LoginToggle } from "../../loginToggle";

import { useAuth0 } from "@auth0/auth0-react";






// probando branch
console.log(import.meta.env.VITE_API_URL);
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const allDaysData = days.map((day) => {
  return {
    day,
    data: [
      {
        unavailable_starting: "00:00:01",
        unavailable_until: "00:00:02",
        vehicle_id: "",
      },
    ],
  };
});


export function FormAddCompany() {

  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <Text>
        Please log in to access the form. <LoginToggle />{" "}
      </Text>
    );
  }
  
  
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const formCompany = useForm({
    initialValues: {
      auth_id: user.sub,
      company_name: user.name,
      company_cell: user.phone_number,
      company_mail: user.email,
      address_company:"",
      work_zone: null,
      radius: 0,
    },
  });

  
  const formVehicle = useForm({
    initialValues: {
      vehicle: [
        {
          number_of_seats: "",
          mispar_rishuy: "",
          build_date: "",
          overtime_price: "",
          company_id: "",
          shomer_shabat: null,
          is_available_work_multiple_days: null,
          days: [...allDaysData],
          calendarDisable: [{ disable_from: null, disable_until: null }]
        },
      ],
      
    },
  });

  if (showSuccessAlert){
    return(
      <Alert
        color="green"
        title="¡Form successfully submitted! !"
        onClose={() => setShowSuccessAlert(false)}
        mt="md"
      >   </Alert>
  )
  }

  return (
      <Box
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();
console.log("formVehicle.values",formVehicle.values);
          try {
            const res = await fetch(`${window.apiBaseUrl}Register`, {
              method: "POST",
              body: JSON.stringify({
                data: {
                  formCompany: formCompany.values,
                  formVehicle: formVehicle.values,
                },
              }),
              
              headers: {
                "Content-Type": "application/json",
              },
            });

            const responseData = await res.json();

            if (res.status === 200) {
              formCompany.reset(); // Resetea el formulario de la compañía
              formVehicle.reset(); // Resetea el formulario del vehículo
              
            if(responseData) {setShowSuccessAlert(true);}
              console.log("Success!", responseData);
            } else {
              console.error("The server responded with an error", responseData);
            }
          } catch (error) {
            console.log("This is what went wrong:", error.message);
          }
        }}
      >
     
            <NewFormCompany formCompany={formCompany} 
            // initialRadius={initialRadius} 
            />
       
            <Vehicule
              formVehicle={formVehicle}
              // formDays={formDays}
              // calendarDisableTourist={calendarDisableTourist}
            />
             <Button fullWidth type="submit">
              upload
            </Button>
         </Box>
            )
         
  
}
