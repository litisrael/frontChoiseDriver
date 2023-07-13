import { useState } from "react";
import { Group, Code, Accordion } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export function Calendar() {
  const [rangeValue, setRangeValue] = useState();

  return (
    <Accordion>
      <Accordion.Item value="customization">
        <Accordion.Control>calendar tourist disable</Accordion.Control>
        <Accordion.Panel>
    
        <DatePickerInput
        
          valueFormat="YYYY-MM-DD" // Establece el formato de valor para recibir solo la fecha
          // mt="md"
          type="range"
          value={rangeValue}
          onChange={setRangeValue}
          label="Pick dates"
          placeholder="Pick dates"
           maw={300}
      mx="auto"
        />

      {/* <Code block mt="xl">
        {JSON.stringify({ rangeValue })}
      </Code> */}

</Accordion.Panel>
       </Accordion.Item>
    </Accordion>
  );
}
