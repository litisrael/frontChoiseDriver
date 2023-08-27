
import { Text ,List ,Paper } from '@mantine/core';
export const ExplainPassenger = ()=>{


 return(
   <Paper shadow="md" radius="md" p="md">

    <Text fz="xl">
The idea behind our app was to make bus reservations easier and get the best results with just one input.
 You provide trip details like passenger count, departure times, and destinations. We handle sending these details to the relevant drivers."
    Advantages:

    <List size="xl">
      <List.Item>Save time by filling out just one form for multiple drivers</List.Item>
      <List.Item>Have a better choice of prices.</List.Item>
      <List.Item> more details about the driver and their vehicle</List.Item>
      
    </List>
    </Text>
   </Paper>
   
 )   
}