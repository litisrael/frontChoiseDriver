
import { Grid, Flex, Image, Text, Group, RingProgress, rem } from '@mantine/core';
import {  CardWithStats} from "./Card";
import { CardOneWay } from "./CardOneWay";

export const OptionTravel = ()=>{
    const clave=import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    console.log(clave);
return( 
    <>


<Grid grow>
<Grid.Col span={4}><CardOneWay /></Grid.Col>
<Grid.Col span={4}><CardWithStats /></Grid.Col>
<Grid.Col span={4}><CardWithStats /></Grid.Col>

</Grid>
    </>
)
}

