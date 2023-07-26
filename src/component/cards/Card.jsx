import { User } from "../../context/user/user";
import { createStyles, Card, Image, Text, Group, RingProgress, rem } from '@mantine/core';

import { useAuth0 } from "@auth0/auth0-react";

export function CardWithStats() {
    const {user, isAuthenticated}= useAuth0()

  return (
      <Card withBorder padding="lg" >
        {!isAuthenticated ?    <Text >
   hace login <User />
         </Text> : <Text >
   hola {user.name} <User />
         </Text>}
     

    </Card>
  );
}