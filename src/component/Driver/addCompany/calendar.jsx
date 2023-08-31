import { useState } from "react";
import { Group, Flex, Code, Accordion, Box ,ActionIcon, Button} from "@mantine/core";
import { DateInput } from "@mantine/dates";

import { IconTrash } from "@tabler/icons-react";
export function Calendar({ calendarDisableTourist }) {
  // const [rangeValue, setRangeValue] = useState();

  return (
    <Accordion>
      <Accordion.Item value="customization">
        <Accordion.Control>calendar tourist disable</Accordion.Control>
        <Accordion.Panel>
          {calendarDisableTourist.values.calendarDisable.map((item, index) => (
            <Flex key={index} m="xs" direction="column">
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="disable from day"
                placeholder="disable from day"
                {...calendarDisableTourist.getInputProps(`calendarDisable.${index}.disable_from`)}
              />
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="disable until day"
                placeholder="disable until day"
                {...calendarDisableTourist.getInputProps(`calendarDisable.${index}.disable_until`)}
              />
              <Box justify="center" align="center">
                <ActionIcon
                  color="red"
                  onClick={() => calendarDisableTourist.removeListItem(`calendarDisable`,index)}
                >
                  <IconTrash size="1rem" />
                </ActionIcon>
              </Box>
            
            </Flex>
          ))}
          <Button
            onClick={() =>
              calendarDisableTourist.insertListItem(`calendarDisable.${index}`, {
                disable_from: null,
                disable_until: null,
              })
            }
          >
            Add disable days
          </Button>

          {/* <Code block mt="xl">
        {JSON.stringify({ rangeValue })}
      </Code> */}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

// export function Calendar({calendarDisableTourist}) {
//   const [rangeValue, setRangeValue] = useState();

//   return (
//     <Accordion>
//     <Accordion.Item value="customization">
//       <Accordion.Control>calendar tourist disable</Accordion.Control>
//       <Accordion.Panel>

//       {calendarDisableTourist.value.map((item, index) => (
//       <Flex key={index} m="xs" direction="column" >

//       <DateInput
//       valueFormat="YYYY-MM-DD"
//       label="disable from time"
//       placeholder="disable from time"
//       {...calendarDisableTourist.getInputProps("disable_from" )}
//     />
//     < DateInput
//     valueFormat="YYYY-MM-DD"
//       label="until time"
//       {...calendarDisableTourist.getInputProps("disable_until" )}
//     />
//     <Box justify="center" align="center" >
// {/*
//      <ActionIcon
//         color="red"
//         onClick={() =>
//           calendarDisableTourist.removeListItem()
//         }
//         >
//         <IconTrash size="1rem" />
//       </ActionIcon> */}

//   </Box>
//   </Flex>
