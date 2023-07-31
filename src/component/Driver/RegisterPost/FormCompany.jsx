import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import {
  Button,
  Group,
  TextInput,
  NumberInput,
  Box,
  Select,
  Chip,
  Switch,
} from "@mantine/core";
import { Zone } from "../../zone";

import { AutoCompleteInputAddress } from "../../apis/AutocomletInputAdress";

export function NewFormCompany({
  formCompany,
  setMarkerPosition,
  setMapCenter,
  setRadius,
}) {
  const handleOriginPlaceChanged = (place) => {
    if (place.geometry && place.geometry.location) {
      const markerPosition = place.geometry.location.toJSON();
      const geoJson = {
        type: "Point",
        coordinates: [markerPosition.lng, markerPosition.lat], // Longitud (lng) primero, latitud (lat) después
      };
      formCompany.setFieldValue("work_zone", geoJson);

      // formCompany.setFieldValue("work_zone", place.formatted_address);
      setMarkerPosition(markerPosition);
      setMapCenter(markerPosition);
    }
  };
  // const handleRadiusChange = (event) => {
  //   const newRadius = parseFloat(event.target.value);
  //   setRadius(newRadius);
  // };
  return (
    <Box component="form" maw={400} mx="auto">
      <TextInput
        label="Name company label "
        placeholder="Name company"
        {...formCompany.getInputProps("company_name")}
      />

      <TextInput
        label="company_cell"
        placeholder="cel"
        withAsterisk
        mt="md"
        {...formCompany.getInputProps("company_cell")}
      />

      <TextInput
        label="Your email"
        placeholder="Your email"
        withAsterisk
        mt="md"
        {...formCompany.getInputProps("company_mail")}
      />

      <AutoCompleteInputAddress
        label="choose work zone "
        placeholder="choose work zone"
        onPlaceChanged={handleOriginPlaceChanged}
        mt="md"
        {...formCompany.getInputProps("work_zone")}
      />

<NumberInput
        label="Radius"
        // defaultValue={radiusValue}
        precision={2}
        min={0}
        step={3000}
        max={80000}
        // {...formCompany.getInputProps("radius")}
  onChange={(newValue) => setRadius(newValue)}
      />

     
    </Box>
  );
}
