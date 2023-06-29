import { Chip, Group } from "@mantine/core";
import { useEffect, useState } from "react";

export  function ChipExample() {
  const [value, setValue] = useState();
  useEffect(()=> console.log(value))

  return (
    
    
<div >
      <Chip.Group position="center"  direction= "row"
       multiple value={value} onChange={setValue}>
        <Group grow  position="center" py="lg" px="lg" padding = "lg" spacing="lg"  borderRadius = 'xl'>
       
        <Chip  value="react">React</Chip>
        <Chip value="ng">Angular</Chip>
        <Chip value="svelte">Svelte</Chip>
        <Chip value="vue">Vue</Chip>
        </Group>
      </Chip.Group>
      
      <Chip.Group >
        <Group   position="center"verticalSpacing="xl" py="lg" px="lg" >
       
        <Chip  value="react">React</Chip>
        <Chip value="ng">Angular</Chip>
        <Chip value="svelte">Svelte</Chip>
        <Chip value="vue">Vue</Chip>
        </Group>
      </Chip.Group>
      
      
      
         </div>
      
    
  );
}
