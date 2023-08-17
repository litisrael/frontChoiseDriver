

import React, { useState } from "react";
import { GoogleMap, LoadScript ,} from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY 
export const LoadScriptApi = ({children}) => {

  return (
    <LoadScript
      googleMapsApiKey= {apiKey}
      libraries={["places"]}
    >
      {children}
     
    </LoadScript>
  );
};
