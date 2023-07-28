import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { GetDataDriver } from "./Driver/update/get1";
import { FaBus, FaHome,FaUser } from 'react-icons/fa';
import { BiSolidLogIn} from 'react-icons/bi'
import { OptionTravel } from "./cards/OptionTravel";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Step,
  NavLink,
  Image
} from "@mantine/core";
import { StepForm } from "./Driver/RegisterPost/FormSteps";
import { FormOneWay } from "./FormPassenger/FormOneWay";
import { CardWithStats } from "./cards/Card";
import {LoadScriptApi  } from "./apis/LoadScript";
import { User } from "../context/user/User";

import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;

export function AppShellExample() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Router>
      <AppShell
        styles={{}}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            align="center"
            // p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <NavLink  icon={<FaHome size="1rem" stroke={1.5} />} 
            component={Link} variant="Link" to="/home"
            label="home" />
            <NavLink  icon={<FaBus size="1rem" stroke={1.5} />}
            label="drivers " childrenOffset={28}>
              <NavLink
                label="add company"
                component={Link}
                variant="Link"
                to="/addcompany"
              />
              <NavLink  
            component={Link} variant="Link" to="/get"
            label="get" />
              <NavLink label="delete" />
            </NavLink>
            <NavLink  icon={<FaUser size="1rem" stroke={1.5} />}
             label="passengers"
            
             childrenOffset={28}>
              <NavLink label="one way"
              component={Link} variant="Link" to="/oneway"
              />
              <NavLink label="Second child link" />
            </NavLink>
            <NavLink  icon={<BiSolidLogIn size="1rem" stroke={1.5} />} 
            component={Link} variant="Link" to="/login"
            label="login" />
          </Navbar>
        }
        //   aside={
        //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //         <Text>Application sidebar</Text>
        //       </Aside>
        //     </MediaQuery>
        //   }
        footer={
          <Footer align="center" height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
             {/* <Image 
        src="https://drive.google.com/uc?id=1UsQiYWNJPXN-xll5ocqbNkg91Ccz9Er1"
         height={200} fit="none"
        alt="Norway"
      /> */}
            <Text pl="xl " align="flex-start" justify="center">
              Application header
            </Text>
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
            </div>
          </Header>
        }
      >
      
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{ redirect_uri: window.location.origin }}
          >
            <LoadScriptApi>
            <Routes>
              <Route path="/home" element={<OptionTravel />} />
              <Route path="/login" element={<User />} />
              <Route path="/get" element={ <GetDataDriver />} />
              <Route path="/addcompany" element={<StepForm />} />
              <Route path="/oneway" element={<FormOneWay />} />
            </Routes>
            </LoadScriptApi>
          </Auth0Provider>
       
      </AppShell>
    </Router>
  );
}
