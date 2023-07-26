import React, { useState } from "react";
import { Button } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

export const GetDataDriver = () => {
  const { user, isAuthenticated } = useAuth0();
  const [companyData, setCompanyData] = useState(null);

  // Verifica si el usuario está autenticado
  if (!isAuthenticated) {
    return <div>Inicia sesión para acceder al formulario.</div>;
  }

  const handleFetchData = async () => {
    try {
      // Construir la URL para la solicitud GET con el auth_id del usuario autenticado
      const url = `http://localhost:4000/Register/${user.sub}`;

      const res = await fetch(url);
      const responseData = await res.json();

      if (res.status === 200) {
        // Actualizar el estado companyData con los datos recibidos del backend
        setCompanyData(responseData.company);
        console.log("Success!", responseData);
      } else {
        console.error("The server responded with an error", responseData);
      }
    } catch (error) {
      console.log("This is what went wrong:", error.message);
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

export default GetDataDriver;
