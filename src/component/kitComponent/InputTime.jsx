
import { IconClock } from '@tabler/icons-react';
import { hoursArray } from "../../data/data.js";
import { NativeSelect } from '@mantine/core';

export function InputTime(inputprops) {

  const valueFromFormDays = inputprops.value; // Obtener el valor de formDays.getInputProps()

  const adjustedValue = valueFromFormDays === "HH:MM" ? null : valueFromFormDays;

  return (
    <NativeSelect
    data={hoursArray}
    placeholder="Your email"
    value={adjustedValue}
      icon={<IconClock size="1rem" stroke={1.5} />}
      {...inputprops}
   
   
    />
  );
} 