
import { Text ,List, Paper } from '@mantine/core';
export const ExplainDrivers = ()=>{


 return(
  
  <Paper shadow="md" radius="md" p="md">

    <Text fz="xl">

As a driver, I understand the complexity of receiving calls from unclear or poorly explained customers. By using our app, you will only receive trips that match your schedule or working areas. You can choose the trips that suit you best and offer the price directly to the passenger.

Advantages:
.
    
    <List size="xl">
      <List.Item>You receive well-detailed trip information without phone calls.</List.Item>
      <List.Item>You only receive trips within your working area.</List.Item>
      <List.Item> You can choose your working hours.</List.Item>
      <List.Item>  You communicate directly with the passenger</List.Item>
      
    </List>
    </Text>
    </Paper>
 )   
}