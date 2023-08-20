import { MantineProvider, Text, Button ,Paper,Loader, ColorSchemeProvider } from '@mantine/core';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {  HeaderPassenger} from "./component/principal/HeaderPassanger";
import { AppShellExample } from "./component/principal/appShell";
import { Auth0Provider } from "@auth0/auth0-react";
import {LoadScriptApi  } from "./context/apis/LoadScript";
import { HeaderDriver } from "./component/principal/HeaderDriver";
import { ConditionalHeaderContainer } from "./component/principal/Conditional";
const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;

const redirectUri = window.location.href;



export default function App() {
  return (
    <div className='App'>
  <MantineProvider> 
  <LoadScriptApi>
<Router>

  
    <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{ redirect_uri: redirectUri }}
            >
    <ColorSchemeProvider>
    {/* <AppShellExample /> */}
    {/* {isPassenger ? <HeaderPassenger /> : <HeaderDriver />} */}
    <ConditionalHeaderContainer />
  </ColorSchemeProvider>
    </Auth0Provider>
            </Router>
    </LoadScriptApi>
  </MantineProvider>
    </div>
  )
}