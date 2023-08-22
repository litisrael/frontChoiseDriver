import { Flex, Text, Button,Loader } from "@mantine/core";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";



export const User = () => {
  const { logout, loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  //  if (isLoading){ return <Loader size="lg" />;}

  const handleLoginClick = (event) => {
    event.preventDefault(); // Evita la acción predeterminada del botón
    loginWithRedirect();
  };
  return (
    <Flex justify={"center"}>
      {isAuthenticated ? (
        <>
        <Button onClick={() => logout()}>logut </Button>
        <Text>hellow  {user.name}</Text>
        </>
      ) : (
        <Button onClick={handleLoginClick}>login </Button>
      )}
    </Flex>
  );
};
