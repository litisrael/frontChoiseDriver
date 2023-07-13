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
  SimpleGrid
} from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { InputTime } from "../InputTime";


export function AllDays({ formDays }) {



  return (
    <Accordion >
    <Accordion.Item value="customization">
      <Accordion.Control>calendar days week</Accordion.Control>
      <Accordion.Panel>
   
      <Flex wrap="wrap"justify="center" align="center" >
        {formDays.values.days.map((item, index) => (
          <Flex key={index}>
            <Box >
              <Text align="center">{item.day}</Text>
             
              {item.data.map((dataItem, dataIndex) => (
                <Flex key={dataIndex} m="xs" direction="column">
                  <Group position="center" mt="md">
                   
                  </Group>
                  <InputTime
                    label="disable from time"
                    {...formDays.getInputProps(
                      `days.${index}.data.${dataIndex}.unavailable_starting`
                    )}
                  />
                  <InputTime
                    label="until time"
                    {...formDays.getInputProps(
                      `days.${index}.data.${dataIndex}.unavailable_until`
                    )}
                  />
                  <Box justify="center" align="center" >

                   <ActionIcon  
                      color="red"
                      onClick={() =>
                        formDays.removeListItem(`days.${index}.data`, dataIndex)
                      }
                      >
                      <IconTrash size="1rem" />
                    </ActionIcon>
                   <Button  
                onClick={() =>
                  formDays.insertListItem(`days.${index}.data`, {
                    unavailable_starting: "00:00",
                    unavailable_until: "00:00",
                  })
                }
                >
                Add disable
              </Button >
                </Box>
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
