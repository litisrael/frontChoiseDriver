import { Tabs } from "@mantine/core";
import { FormOneWay } from "../../passanger/FormOneWay";
import { PricesOfPassenger } from "../../passanger/PricesOfPassenger";
// import { HeaderDriver } from "../HeaderDriver";
import { useNavigate, useParams } from "react-router-dom";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { ConditionalHeaderContainer } from "../Conditional";
  


import { PassengerPages } from "../../../pages/PassangerPages";

console.log(window.location.origin);


export const TabsPassenger = ({ classes }) => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <>

    <Tabs
    
    // defaultValue="Home"
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

        {/* <Button ml="auto" leftIcon={<IconDatabase />} variant="white" color="yellow" 
       component={Link}
       
       to="/drivers"
       >
      TO DRIVERS  */}
    {/* </Button> */}
        {/* <Tabs.Tab value="DRIVER" >   </Tabs.Tab> */}
      </Tabs.List>


      <PassengerPages />
    </Tabs>
    
    
       </>
  );
};
