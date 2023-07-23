
import { Grid, Flex, Image, Text, Group, RingProgress, rem } from '@mantine/core';
import {  CardWithStats} from "./Card";
import { CardOneWay } from "./CardOneWay";
import { Maps } from "../apis/Maps";
const center = { lat: 31.76904, lng: 35.21633 };
const zoom = 15;


export const OptionTravel = ()=>{

return( 
    <>


<Grid grow>
<Grid.Col span={4}><CardOneWay /></Grid.Col>
<Grid.Col span={4}><CardWithStats /></Grid.Col>
<Grid.Col span={4}><CardWithStats /></Grid.Col>
<Grid.Col span={4} style={{ minHeight: rem(400) }}> 
<Maps center={center} zoom={zoom}>
            {/* Agrega aquí cualquier contenido adicional que desees dentro del componente Maps */}
          </Maps>
     </Grid.Col>
</Grid>
    </>
)
}

