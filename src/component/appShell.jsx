import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { AuthProvider } from "../context/authcontex";

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
} from "@mantine/core";
import { StepForm } from "./Formsteps/FormSteps";

import { CardWithStats } from "./Card";

import { User } from "../context/user/user"
import { Auth0Provider } from "@auth0/auth0-react";



const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;

export function AppShellExample() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Router>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            align="center"
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            {/* <Navbar.Section>n
            <Text align="center">argentina campeon</Text>
          </Navbar.Section> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text component={Link} variant="Link" to="/home">
                Home page
              </Text>
              <Text component={Link} variant="Link" to="/login">
                login page
              </Text>
              <Text component={Link} variant="Link" to="/title">
                title page
              </Text>
              <Text component={Link} variant="Link" to="/steps">
                form new driver
              </Text>
            </div>
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
        <AuthProvider>
        
    <Auth0Provider domain={domain} clientId={clientId}
   authorizationParams={{ redirect_uri: window.location.origin }}
   
    >
          <Routes>
            <Route path="/home" element={<CardWithStats />} />
            <Route  path="/login"element={<User />}/>
            <Route path="/title" element={<> </>} />
            <Route path="/steps" element={<StepForm />} />
          </Routes>
          </Auth0Provider>
        </AuthProvider>
      </AppShell>
    </Router>
  );
}
