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
} from "@mantine/core";
import { Maps } from "../../../context/apis/Maps";
import { useForm } from "@mantine/form";
import { NewFormCompany } from "./FormCompany.jsx";
import { Vehicule } from "./Vehicles.jsx";
import { User } from "../../User";

import { useAuth0 } from "@auth0/auth0-react";

const apiBaseUrl = "http://localhost:4000/" || import.meta.env.VITE_API_URL 
console.log(apiBaseUrl);
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

const allDaysData = days.map((day) => {
  return {
    day,
    data: [
      {
        unavailable_starting: null,
        unavailable_until: null,
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
        Please log in to access the form. <User />{" "}
      </Text>
    );
  }
  
  const formCompany = useForm({
    initialValues: {
      auth_id: user.sub,
      company_name: user.name,
      company_cell: user.phone_number,
      company_mail: user.email,
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
        },
      ],
    },
  });

  const formDays = useForm({
    initialValues: {
      days: [...allDaysData],
    },
  });

  const calendarDisableTourist = useForm({
    initialValues: {
      calendarDisable: [{ disable_from: null, disable_until: null }],
    },
  });

  return (
      <Box
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            const res = await fetch(`${apiBaseUrl}Register`, {
              method: "POST",
              body: JSON.stringify({
                data: {
                  formCompany: formCompany.values,
                  formVehicle: formVehicle.values,
                  formDays: formDays.values,
                  calendarDisableTourist: calendarDisableTourist.values,
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
              formDays.reset();
              calendarDisableTourist.reset();
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
              formDays={formDays}
              calendarDisableTourist={calendarDisableTourist}
            />
             <Button fullWidth type="submit">
              upload
            </Button>
         </Box>
            )
         
  
}
