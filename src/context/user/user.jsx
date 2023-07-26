import { Flex, Loader, Button } from "@mantine/core";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import{useEffect }from "react"
export const User = () => {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  //  if (isLoading){ return <Loader size="lg" />;}

  return (
    <Flex justify={"center"}>
      {isAuthenticated ? (
        <Button onClick={() => logout()}>logut </Button>
      ) : (
        <Button onClick={() => loginWithRedirect()}>login </Button>
      )}

     
    </Flex>
  );
};
