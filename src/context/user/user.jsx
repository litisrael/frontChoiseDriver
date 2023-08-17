import { Flex, Text, Button } from "@mantine/core";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const User = () => {
  const { logout, loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  //  if (isLoading){ return <Loader size="lg" />;}

  return (
    <Flex justify={"center"}>
      {isAuthenticated ? (
        <>
        <Button onClick={() => logout()}>logut </Button>
        <Text>hellow  {user.name}</Text>
        </>
      ) : (
        <Button onClick={() => loginWithRedirect()}>login </Button>
      )}
    </Flex>
  );
};
