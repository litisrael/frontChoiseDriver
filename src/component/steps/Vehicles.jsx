import { useForm } from "@mantine/form";
import {
  TextInput,
  Switch,
  Group,
  ActionIcon,
  Box,
  Text,
  Flex,
  Button,
  SimpleGrid,
  Code,
  Accordion
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Calendar } from "./calendar";
import { AllDays } from "./AllDays";

export function Vehicule({ formVehicle, formDays ,calendarDisableTourist}) {
  return (
    <Box mx="auto">
      {formVehicle.values.vehicle.map((item, index) => (
        <Box key={index}
         justify="center" 
        align="center"
        >
          <Flex mt="xs" direction="row"justify="center" 
        align="center"  wrap="wrap" >
            <TextInput
             label= "seats passenger in vehicle"
            //  description=""
              placeholder="seats passenger in vehicle"
              withAsterisk
             
              {...formVehicle.getInputProps(`vehicle.${index}.number_of_seats`)}
            />
            <TextInput
             label="the vehicle registration number"
            //  description=""
              placeholder="mispar_rishuy"
              withAsterisk
              // sx={{ flex: 1 }}
              {...formVehicle.getInputProps(`vehicle.${index}.mispar_rishuy`)}
            />
            <TextInput
             label="What is the year of the vehicle?"
            //  description="What is the year of the vehicle?"
              placeholder="build_date"
              withAsterisk
              // sx={{ flex: 1 }}
              {...formVehicle.getInputProps(`vehicle.${index}.build_date`)}
            />
            <TextInput
             label="charge for additional waiting hour"
             description=""
              placeholder="overtime price"
              // withAsterisk
              // sx={{ flex: 1 }}
              {...formVehicle.getInputProps(`vehicle.${index}.overtime_price`)}
            />
            {/* <Switch
              label="Active"
              {...formVehicle.getInputProps(`vehicle.${index}.active`, {
                type: "checkbox",
              })}
            /> */}
            <Switch
          label="shomer shabat?"
          // description="bla "
          labelPosition="left"
          {...formVehicle.getInputProps("shomer_shabat", {
            type: "checkbox",
          })}
        />
           <Switch
          label="available work multiplay day"
          labelPosition="left"
          {...formVehicle.getInputProps("is_available_work_multiple_days")}
        />
       
          </Flex>
          <Box align="center">
            <Calendar calendarDisableTourist={calendarDisableTourist} />
          </Box>
          <Box align="center">
            <AllDays formDays={formDays} />
          </Box>
          <Button   
            leftIcon={<IconTrash />}variant="outline" color="red"
              
              onClick={() => formVehicle.removeListItem("vehicle", index)}
            >
              remove vehicle
            </Button>
        </Box>
        
      ))}

{formVehicle.values.vehicle.length > 0 ? null :(
  <Text color="dimmed" align="center">
    No one here...
  </Text>
) }

      <Group position="center" mt="md">
        <Button
          onClick={() =>
            formVehicle.insertListItem("vehicle", {
              number_of_seats: "",
              mispar_rishuy: "",
              build_date: "",
              overtime_price: "",
              company_id: "",
           
            }
            )
          }
        >
          Add vehicle
        </Button>
       
      </Group>
    </Box>
  );
}
