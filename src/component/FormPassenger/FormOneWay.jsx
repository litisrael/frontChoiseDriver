// import {
//     useForm,
//     isNotEmpty,
//     isEmail,
//     isInRange,
//     hasLength,
//     matches,
// } from "@mantine/form";

import { useForm } from "@mantine/form";
import { Button, Group, Text, TextInput, NumberInput, Box } from "@mantine/core";

import { useJsApiLoader,GoogleMap } from "@react-google-maps/api";

const center = {lat:31.4117 , lng:35.0818}
const clave= import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export function FormOneWay() {

    const form = useForm({
    initialValues: {
      number_of_passengers: "",
      // from_region: "",
      // from_street: "",
      from_address: "",
      to_address: "",
      // to_city: "",
      // to_street: "",
      departure_date: "",
      departure_hour: "",
    }
  });
  

  const {isLoaded}=useJsApiLoader({
    googleMapsApiKey: clave
})
if(!isLoaded)
{return <Text>bla</Text>}



  return (
    <>
<GoogleMap
 center={center} zoom={15} 
mapContainerStyle={ {width:100, height:100}}
>

</GoogleMap>
    
    <Box
      component="form"
      maw={400}
      mx="auto"
    //   onSubmit={form.onSubmit(() => {})}
      >
      <NumberInput
        label="number of passengers"
        placeholder="numberof passengers"
        withAsterisk
        {...form.getInputProps("number_of_passengers")}
        />

      <TextInput
        label="from address"
        placeholder="from_address"
        withAsterisk
        mt="md"
        {...form.getInputProps("from_address")}
        />
      <TextInput
        label="to_address"
        placeholder="to_address"
        withAsterisk
        mt="md"
        {...form.getInputProps("to_address")}
        />
      <TextInput
        label="departure_date"
        placeholder="departure_date"
        withAsterisk
        mt="md"
        {...form.getInputProps("departure_date")}
        />
     <TextInput
        label="departure_hour"
        placeholder="departure_hour"
        withAsterisk
        mt="md"
        {...form.getInputProps("departure_hour")}
        />
   

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </Box>
    </>
  )
}
