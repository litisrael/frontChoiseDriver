import React from "react";
import { HeaderPassenger } from "./hader/passanger/HeaderPassanger"; // Asegúrate de que la ruta al archivo sea correcta
import { HeaderDriver } from "./hader/driver/HeaderDriver"; // Asegúrate de que la ruta al archivo sea correcta
import { Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { useLocation } from 'react-router-dom';
export const ConditionalHeaderContainer = () => {
  const location = useLocation();
  const isPassenger = location.pathname.startsWith('/passenger');;

  return (
  <>
      {isPassenger ? <HeaderPassenger /> : <HeaderDriver />}
  </>
   
  );
};