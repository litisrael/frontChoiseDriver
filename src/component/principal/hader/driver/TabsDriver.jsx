import { Tabs, Button, Menu } from "@mantine/core";
import { rem } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

import { Link,  } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";

export const TabsDriver = ({ classes }) => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Tabs
      defaultValue="Home"
      variant="outline"
      classNames={{
        root: classes.tabs,
        tabsList: classes.tabsList,
        tab: classes.tab,
      }}
      value={tabValue}
      onTabChange={(value) => navigate(`/drivers/${value}`)}
    >
      <Tabs.List>
        <Menu  
         shadow="md">
          <Menu.Target>
            <Button>COMPANY</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Tabs.Tab value="addCompany">ADD COMPANY</Tabs.Tab>

            <Tabs.Tab value="updateCompany">UPDATE COMPANY </Tabs.Tab>
          </Menu.Dropdown>
        </Menu>

        <Tabs.Tab value="offerPrice">OFFERED PRICE</Tabs.Tab>

        <Button
          ml="auto"
          variant="white"
          color="blue"
          component={Link}
          to="/passenger"
        >
          TO PASSENGERS
        </Button>
      </Tabs.List>
    </Tabs>
  );
};
