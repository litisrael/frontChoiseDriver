import React, { useEffect, useState } from 'react';
import { User } from "../../context/user/user";
import { createStyles, Card, Image, Text, Group, RingProgress, rem } from '@mantine/core';

import { useAuth0 } from "@auth0/auth0-react";

    const {user, isAuthenticated}= useAuth0()

  // return (
  //     <Card withBorder padding="lg" >
  //       {!isAuthenticated ?    <Text >
  //  hace login <User />
  //        </Text> : <Text >
  //  hola {user.name}
  //        </Text>}
     

const MyPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const companyId = 'tu-valor-de-company-id'; // Reemplaza esto con el valor que desees obtener

    // Hacer la solicitud GET al servidor
    fetch(`/ruta-al-endpoint/${companyId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data); // Almacenar los datos en el estado local
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  if (!data) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h1>Company and Vehicles Information</h1>
      {/* Renderizar los datos recibidos */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyPage;
