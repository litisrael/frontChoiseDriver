import { DatesProvider, DatePickerInput } from "@mantine/dates";
import { useState , useEffect} from "react";
import { Group ,Text,Code} from "@mantine/core";
import { DatePicker, TimeInput,DateInput } from "@mantine/dates";
{/* <DateInput
dateParser={(input) => {
  if (input === 'WW2') {
    return new Date(1939, 8, 1);
  }
  return new Date(input); */}
// }}
export function Calendar() {
  const [rangeValue, setRangeValue] = useState();
  
  useEffect(()=> console.log(rangeValue))
  return (
    <>
    
    {/* <Text></Text> */}
      <Group position="center">
        {/* <Text>value = {value}</Text> */}
        <DatePickerInput
          valueFormat="YYYY-M-D"
          mt="md"
          type="range"
          value={rangeValue}
          onChange={setRangeValue}
          label="Pick date"
          placeholder="Pick date"
        />
        {/* <Text>value={value}</Text> */}
      </Group>
      <Code block mt="xl">
            {JSON.stringify({rangeValue})}
          </Code>
    </>
  );
}

// export  function Calendar() {
//   return (
//     <DatesProvider settings={{ locale: 'en', firstDayOfWeek: 0, weekendDays: [0] }}>
//       {/* <MonthPickerInput label="Pick month" placeholder="Pick month" /> */}
//       {/* <DatePicker type="range" /> */}
//       <DatePickerInput  valueFormat="YYYY MM DD" mt="md"
//       label="Pick date" placeholder="Pick date" />
//     </DatesProvider>
//   );
// }

// export function Calendar() {
//   const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
//   return (
//     <Group position="center">
//       <DatePicker type="range" value={value} onChange={setValue} />
//     </Group>
//   );
// }
