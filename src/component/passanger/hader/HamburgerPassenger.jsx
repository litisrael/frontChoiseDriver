import { Menu, Burger } from "@mantine/core";
import { FaBus, FaHome, FaUser } from "react-icons/fa";
import {  Link, Routes } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export const HamburgerPassenger = ({ classes }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Menu
      opened={drawerOpened}
      onClose={closeDrawer}
      size="xs"
      padding="md"
      title="Navigation"
      className={classes.burger}
      zIndex={1000000}
    >
      <Menu.Target>
        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          className={classes.burger}
          size="sm"
        />
      </Menu.Target>

      <Menu.Dropdown>
        {/* <Menu.Label>Application</Menu.Label> */}

        <Menu.Item
          icon={<FaHome size="1rem" stroke={1.5} />}
          component={Link}
          variant="Link"
          to="/home"
        >
          home
        </Menu.Item>

        <Menu.Item component={Link} variant="Link" to="/passenger/oneWay">
          ONE WAY
        </Menu.Item>
        <Menu.Item component={Link} variant="Link" to="/passenger/pricesOfPassenger">
        PRICES OF DRIVER
        </Menu.Item>
        
        <Menu.Divider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
        //
        // icon={<IconSettings size="0.9rem" stroke={1.5} />}
        >
          Account settings
        </Menu.Item>
        <Menu.Item
        // icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
        >
          Change account
        </Menu.Item>
        <Menu.Item
        //  icon={<IconLogout size="0.9rem" stroke={1.5} />}
        >
          Logout
        </Menu.Item>

        <Menu.Divider />
      </Menu.Dropdown>
     
    </Menu>
  );
};
