import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { TextInput } from "@mantine/core";


export const AutoCompleteInputAddress = ({ label, placeholder, onChange, onPlaceChanged,
  // formCompany 
  }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState("");

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const handlePlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
console.log(place );
     console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);

      setFormattedAddress(formattedAddress);
      if (onChange) {
        onChange(formattedAddress);
      }
      if (onPlaceChanged) {
        onPlaceChanged(place);
      }
    } else {
      console.error("Invalid searchResult object");
    }
  };

  return (
    <Autocomplete onPlaceChanged={handlePlaceChanged} onLoad={onLoad} 
     restrictions={{ country: "IL" }}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={formattedAddress}
        onChange={(event) => setFormattedAddress(event.target.value)}
        // {...formCompany.getInputProps("address_company")}
 
      />
    </Autocomplete>
  );
};

