import { MantineProvider, Text, Button ,Paper,Loader, ColorSchemeProvider } from '@mantine/core';

import {  HeaderTabs} from "./component/principal/HeaderTabs";
import { AppShellExample } from "./component/principal/appShell";
import { Auth0Provider } from "@auth0/auth0-react";
import {LoadScriptApi  } from "./context/apis/LoadScript";
const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;


export default function App() {

  return (
    <div className='App'>
  <MantineProvider> 
  <LoadScriptApi>

  
    <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{ redirect_uri: window.location.origin }}
          >
    <ColorSchemeProvider>
    {/* <AppShellExample /> */}
    <HeaderTabs   />
  </ColorSchemeProvider>
    </Auth0Provider>
    </LoadScriptApi>
  </MantineProvider>
    </div>
  )
}