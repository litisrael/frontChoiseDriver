import { Tabs } from "@mantine/core";

import { useNavigate, useParams } from "react-router-dom";

import { DriverPages } from "../../../pages/DriversPages";

import { ConditionalHeaderContainer } from "../Conditional";
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
        {/* <Tabs.Tab value="oneWay">ONE WAY</Tabs.Tab>
        <Tabs.Tab value="twoWay">ROUND WAY</Tabs.Tab>
        <Tabs.Tab value="pricesOfPassenger">PRICES OF DRIVER</Tabs.Tab> */}

        {/* <Tabs.Tab value="passenger" ml="auto"> to passenger  </Tabs.Tab> */}
      </Tabs.List>

{/* <ConditionalHeaderContainer /> */}
    </Tabs>
    
  );
};
