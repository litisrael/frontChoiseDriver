
import { Grid, Flex, Image, Text, Group, RingProgress, rem } from '@mantine/core';
import {  CardWithStats} from "./Card";


export const OptionTravel = ()=>{

return( 
    <>


<Grid grow>
<Grid.Col span={4}><CardWithStats /></Grid.Col>
<Grid.Col span={4}><CardWithStats /></Grid.Col>
<Grid.Col span={4}><CardWithStats /></Grid.Col>

</Grid>
    </>
)
}

