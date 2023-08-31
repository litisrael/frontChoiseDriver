import React, { useState } from "react";
import { Button,Text } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
// import { User } from "../../../context/user/User";
import { getCompanyData } from "../../../data/data.js";

const apiBaseUrl = "http://localhost:4000/" || import.meta.env.VITE_API_URL 

export const GetDataDriver = () => {
  const { user, isAuthenticated } = useAuth0();
  const [companyData, setCompanyData] = useState(null);

  // Verifica si el usuario está autenticado
  if (!user) {  <Text>
    Please log in to access the form. 
    {/* <User />{" "} */}
  </Text>
  }


  const handleFetchData = async () => {
    const responseData = await getCompanyData(user.sub);
    if (responseData) {
      setCompanyData(responseData);
      console.log("Success!", responseData);
    }
  };
  return (
    <>
      {/* Botón para realizar la solicitud GET */}
      <Button onClick={handleFetchData}>Obtener Datos</Button>

      {/* Renderizado de los datos de companyData si existen */}
      {companyData && (
        <div>
          <h2>Company Data:</h2>
          <pre>{JSON.stringify(companyData, null, 2)}</pre>
        </div>
      )}
    </>
  );
};
