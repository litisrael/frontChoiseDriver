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
  Grid,
  Chip,
  Switch,
} from "@mantine/core";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import { Zone } from "../../zone";
import { useState, useEffect } from "react";
import { AutoCompleteInputAddress } from "../../apis/AutocomletInputAdress";
import { Maps } from "../../apis/Maps";
import { Bottones } from "./Bottones";
export function NewFormCompany({ formCompany, 
  // initialRadius 
}) {
  const [radius, setRadius] = useState(0);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState();
  const circleOptions = {
    strokeColor: "#87CEFA", // Color celeste claro
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#87CEFA",
    fillOpacity: 0.35,
  };
  


  const handleOriginPlaceChanged = (place) => {
    
    if (place.geometry && place.geometry.location) {
      const markerPosition = place.geometry.location.toJSON();
      const geoJson = {
        type: "Point",
        coordinates: [markerPosition.lat, markerPosition.lng], // Latitud (lat) primero, longitud (lng) después
      };
      formCompany.setFieldValue("work_zone", geoJson);

      setMarkerPosition(markerPosition);
      setMapCenter(markerPosition);
  
    }
  };
  useEffect(() => {
    // Establecer el estado inicial de radius después de que el marcador se haya establecido.
    if (markerPosition && radius === 0) {
      setRadius(25000);
      formCompany.setFieldValue("radius", 25000);
    }
  }, [markerPosition]);

  const handleRadius = (radius) => {
    console.log("New Radius:", radius);
      setRadius(radius);
      formCompany.setFieldValue("radius", radius);
    
  };
console.log(radius);
  return (
    <Grid grow>
      <Grid.Col span={6}>
        <Maps center={mapCenter} markerPosition={markerPosition}>
          {markerPosition && <Marker position={markerPosition} />}
          { markerPosition && <Circle
                center={markerPosition}
                radius={radius}
                options={circleOptions}
              />}
        </Maps>
      </Grid.Col>
      <Grid.Col span={6}>
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
            // {...formCompany.getInputProps("work_zone")}
          />

          <Bottones value={radius} onChange={handleRadius}
          />
        </Box>
      </Grid.Col>
    </Grid>
  );
}
