import { Text, Flex } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    isAuthenticated && (
      <div>
        <h1>{user.name}</h1>
      </div>
    )
  );
};
