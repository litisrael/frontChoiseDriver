import { Tabs,Button, Menu } from "@mantine/core";
import { rem } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";


export const TabsDriver = ({ classes }) => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Tabs
    
    // defaultValue="Home"
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
        <Tabs.Tab value="addCompany">ADD COMPANY</Tabs.Tab>


        <Menu width={200} shadow="md">
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href="https://mantine.dev">
          Mantine website
        </Menu.Item>

        <Menu.Item
          icon={<IconExternalLink size={rem(14)} />}
          component="a"
          href="https://mantine.dev"
          target="_blank"
        >
          External link
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>


        <Button ml="auto" variant="white" color="blue" 
       component={Link}
  
       to="/passenger"
        >
      TO PASSENGERS  
      </Button>
      </Tabs.List>




    </Tabs>
    
  );
};
