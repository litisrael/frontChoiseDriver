import {
    IconLogout,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronDown,
  } from "@tabler/icons-react";
  import { useState } from "react";
  import { Menu, Group,  UnstyledButton, Avatar ,rem,Text,Button} from "@mantine/core";
  import { LoginToggle } from "../loginToggle";
import { useAuth0 } from '@auth0/auth0-react';



export const UserMenu =({ user = "no user", classes, cx})=>{

    const [userMenuOpened, setUserMenuOpened] = useState(false);

    
  const { logout } = useAuth0();

  const handleLogoutClick = () => {
    logout({ returnTo: window.location.origin });
  }


return (<Menu
width={260}
position="bottom-start"
transitionProps={{ transition: "pop-top-right" }}
onClose={() => setUserMenuOpened(false)}
onOpen={() => setUserMenuOpened(true)}
withinPortal
>
<Menu.Target>
  <UnstyledButton
    className={cx(classes.user, {
      [classes.userActive]: userMenuOpened,
    })}
  >
    <Group spacing={7}>
      <Avatar
        src={user.image}
        alt={user.name}
        radius="xl"
        size={20}
      />
      <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
        {user.name}
      </Text>
      <IconChevronDown size={rem(12)} stroke={1.5} />
    </Group>
  </UnstyledButton>
</Menu.Target>
<Menu.Dropdown>

 

  <Menu.Label>Settings</Menu.Label>
  <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
    Account settings
  </Menu.Item>
  <Menu.Item
    icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
  >
    Change account
  </Menu.Item>
  <LoginToggle
   leftIcon={<IconLogout size="0.9rem" stroke={1.5} />}
  className={cx(classes.user, {
    [classes.userActive]: userMenuOpened,
  })}
/>

       
  <Menu.Divider />


  <Menu.Label>Danger zone</Menu.Label>
  <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
    Pause subscription
  </Menu.Item>
  <Menu.Item
    color="red"
    icon={<IconTrash size="0.9rem" stroke={1.5} />}
  >
    Delete account
  </Menu.Item>
</Menu.Dropdown>
</Menu>)


}