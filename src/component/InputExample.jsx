import { Chip, Group, Input, TextInput } from "@mantine/core";
import { IconBrandTwitterFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export  function InputExample( ) {
  return (
    <div align="center" justify="center">

      <TextInput 
     icon= {<IconBrandTwitterFilled />}
     label = "vamos argentino"
     description = "ganamos mundial"
     required
     error="pone bien "
     />
      <TextInput/>
      <TextInput/>
     </div>
      
      
    
  );
}
