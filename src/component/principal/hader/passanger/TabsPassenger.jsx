import { Tabs, Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

export const TabsPassenger = ({ classes }) => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <>
      <Tabs
        defaultValue="passenger"
        variant="outline"
        classNames={{
          root: classes.tabs,
          tabsList: classes.tabsList,
          tab: classes.tab,
        }}
        value={tabValue}
        onTabChange={(value) => navigate(`/passenger/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="oneWay">ONE WAY</Tabs.Tab>
          <Tabs.Tab value="twoWay">ROUND WAY</Tabs.Tab>
          <Tabs.Tab value="pricesOfPassenger">PRICES OF DRIVER</Tabs.Tab>
          <Button
            ml="auto"
            variant="white"
            color="blue"
            component={Link}
            to="/drivers/"
          >
            TO DRIVERS
          </Button>
        </Tabs.List>
      </Tabs>
    </>
  );
};
