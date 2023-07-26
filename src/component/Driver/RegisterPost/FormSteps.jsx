import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Flex,
  TextInput,
  PasswordInput,
  Box,
  Code,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { NewFormCompany } from "./FormCompany.jsx";
import { Vehicule } from "./Vehicles.jsx";


import { useAuth0 } from "@auth0/auth0-react";


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


export function StepForm() {
  
  const { user, isAuthenticated } = useAuth0();

  // Verifica si el usuario está autenticado
  if (!isAuthenticated) {
    return <div>Inicia sesión para acceder al formulario.</div>;
  }

  const [active, setActive] = useState(0);

  // const {formDays, formVehicle, renderFormVehicle} = vehicule()
  
  const formCompany = useForm({
    initialValues: {   
      auth_id: user.sub,
      company_name: user.name,
      company_cell: user.phone_number,
      company_mail: user.email,
      work_zone: [],
    }
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
          is_available_work_multiple_days:null,
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
    initialValues:{ 
   calendarDisable: [ { disable_from:null,
    disable_until: null,}]
   }
  })
  
  const forms = [formCompany, formVehicle];
  


  const nextStep = () =>
    setActive((current) => {
      if (forms[current].validate().hasErrors) {
        return current;
      }
      return current < forms.length ? current + 1 : current;
    });

  

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
    <Box
    component="form"
    onSubmit={async (e) => {
      e.preventDefault()
    
      try {
     

        const res = await fetch("http://localhost:4000/Register", {
          method: "POST",
          body: JSON.stringify({
            data: {
              formCompany: formCompany.values,
              formVehicle: formVehicle.values,
              formDays: formDays.values,
              calendarDisableTourist: calendarDisableTourist.values
            }
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const responseData = await res.json();
    
        if (res.status === 200) {
          formCompany.reset(); // Resetea el formulario de la compañía
          formVehicle.reset(); // Resetea el formulario del vehículo
          formDays.reset()
          calendarDisableTourist.reset()
          console.log('Success!', responseData);
        } else {
          console.error('The server responded with an error', responseData);
        }
      } catch (error) {
        console.log('This is what went wrong:', error.message);
      }
    }}
    
  
>
    <Flex direction={"row"} position="right" m="xl">
        {active !== 0 && (
          <Button fullWidth variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== forms.length  && <Button fullWidth onClick={nextStep}>Next step</Button>}
        {active === forms.length  && (
  <Button fullWidth type="submit">upload</Button>
)}

      </Flex>
      <Stepper active={active} breakpoint="sm">
      
        <Stepper.Step label="First step" description="Profile settings">
          <NewFormCompany formCompany={formCompany}/>

          {/* <TextInput label="Username" placeholder="Username" {...form1.getInputProps('username')} />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...form1.getInputProps('password')}
          /> */}
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
        <Vehicule formVehicle={formVehicle} formDays={formDays} calendarDisableTourist={calendarDisableTourist} />
          {/* <TextInput
            label="Name"
            placeholder="Name"
            {...form2.getInputProps("name")}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            {...form2.getInputProps("email")}
          /> */}
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">
        
        </Stepper.Step>
        <Stepper.Completed >
          Completed! Form values:
          {/* <Code block mt="xl">
            {JSON.stringify(
              {
                formCompany: formCompany.values,
                formVehicle: formVehicle.values,
                formDays: formDays.values,
              },
              null,
              2
            )} */}
          {/* </Code> */}
        </Stepper.Completed>
      </Stepper>

      </Box>
    </>
  );
}
