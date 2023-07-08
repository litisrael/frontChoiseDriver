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
import { newFormCompany } from "./newFormCompany.jsx";
import { vehicule } from "./Vehicles";
import { v4 as uuidv4 } from 'uuid';

export function StepForm() {
  

  const [active, setActive] = useState(0);
  const { formCompany, renderFormCompany } = newFormCompany();
  const {formDays, formVehicle, renderFormVehicle} = vehicule()
  
  
  const forms = [formCompany, formVehicle, formDays];
  


  const nextStep = () =>
    setActive((current) => {
      if (forms[current].validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
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
              formDays: formDays.values
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
          console.log('¡Éxito!', responseData);
        } else {
          console.error('El servidor respondió con un error', responseData);
        }
      } catch (error) {
        console.log('Esto es lo que salió mal:', error.message);
      }
    }}
    
  
>
    <Flex direction={"row"} position="right" m="xl">
        {active !== 0 && (
          <Button fullWidth variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button fullWidth onClick={nextStep}>Next step</Button>}
        {active === forms.length  && (
  <Button fullWidth type="submit">upload</Button>
)}

      </Flex>
      <Stepper active={active} breakpoint="sm">
      
        <Stepper.Step label="First step" description="Profile settings">
          {renderFormCompany}

          {/* <TextInput label="Username" placeholder="Username" {...form1.getInputProps('username')} />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...form1.getInputProps('password')}
          /> */}
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
        {renderFormVehicle}
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
