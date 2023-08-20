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
export const UserMenu =({user, classes, cx})=>{

    const [userMenuOpened, setUserMenuOpened] = useState(false);

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
  <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>
    Logout
  </Menu.Item>

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