import { MultiSelect } from '@mantine/core';
import { useState } from "react";
const data = Array(50).fill(0).map((_, index) => `Item ${index}`);

export const Zone = (inputProps) => 
// console.log(inputProps,"prop");
 (
     <MultiSelect
        data={data}
        label="MultiSelect with native scrollbars"
        placeholder="Dropdown rendered as div element"
        dropdownComponent="div"
        {...inputProps}
       
    />
    
);
