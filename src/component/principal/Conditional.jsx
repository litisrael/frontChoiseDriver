import React from "react";
import { HeaderPassenger } from "../passanger/hader/HeaderPassanger"; // Asegúrate de que la ruta al archivo sea correcta
import { HeaderDriver } from "../Driver/hader/HeaderDriver"; // Asegúrate de que la ruta al archivo sea correcta
import { Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { useLocation } from 'react-router-dom';
export const ConditionalHeaderContainer = () => {
  const location = useLocation();
  const isDriver = location.pathname.startsWith('/drivers');;

  return (
  <>
      {isDriver ? <HeaderDriver /> :<HeaderPassenger />  }
  </>
   
  );
};