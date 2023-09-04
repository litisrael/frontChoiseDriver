import { useForm } from "@mantine/form";
import {
  TextInput,
  Switch,
  Group,
  Flex,
  ActionIcon,
  Box,
  Text,
  Button,
  Code,
  Accordion,
  SimpleGrid,
} from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { InputTime } from "../../kitComponent/InputTime";

export function AllDays({ formVehicle, 
  indexVehicle
 }) {
  // console.log("formVehicle",formVehicle);

  return (
    <Accordion>
      <Accordion.Item value="customization">
        <Accordion.Control>calendar days week</Accordion.Control>
        <Accordion.Panel>
          <Flex wrap="wrap" justify="center" align="flex-start">

            {formVehicle.values.vehicle.length > 0 && formVehicle.values.vehicle[0].days && 
         
            formVehicle.values.vehicle[0].days.map((item, dayIndex) => (


              <Flex key={`${indexVehicle}-${dayIndex}`}>
                <Box>
                  <Text align="center">{item.day}</Text>
                
                  {item.data.map((dataItem, dataIndex) => (
                    // key={dataItem.dataIndex}
                    <Flex  key={`${indexVehicle}-${dayIndex}-${dataIndex}`} m="xs" direction="column">

                      <InputTime
                        label="disable from time"
                        {...formVehicle.getInputProps(
                          `vehicle.${indexVehicle}.days.${dayIndex}.data.${dataIndex}.unavailable_starting`
                        
                        )}
                      />
                      <InputTime
                        label="until time"
                        {...formVehicle.getInputProps(
                          `vehicle.${indexVehicle}.days.${dayIndex}.data.${dataIndex}.unavailable_until`
                        )}
                      />
                      <Box justify="center" align="center">
                        <ActionIcon
                          color="red"
                          onClick={() =>
                           
                              formVehicle.removeListItem(
                                `vehicle.${indexVehicle}.days.${dayIndex}.data`,
                                dataIndex
                            )
                          }
                        >
                          <IconTrash size="1rem" />
                        </ActionIcon>
                      </Box>
                      <Button
                        onClick={() =>
                          formVehicle.insertListItem(`vehicle.${indexVehicle}.days.${dayIndex}.data`, dataIndex,{
                            unavailable_starting: "",
                            unavailable_until: "",
                          })
                        }
                      >
                        Add disable
                      </Button>
                    </Flex>
                  ))}
                </Box>
              </Flex>
            ))}
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
