import { MantineProvider, Text, Button ,Paper,Loader, ColorSchemeProvider } from '@mantine/core';

import { BrowserRouter as Router,  } from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";
import {LoadScriptApi  } from "./context/apis/LoadScript";
import { Pages } from "./pages/Pages";
import { PublicPages } from "./pages/PublicPages";
import { ConditionalHeaderContainer } from "./component/Conditional";



const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;


const redirectUri = window.location.href;





export default function App() {
  return (
    <div className='App'>
  <MantineProvider > 
  <LoadScriptApi>
<Router>
{/* <PublicPages /> */}
  
    <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{ redirect_uri: redirectUri }}
            >
<ConditionalHeaderContainer />
 < Pages />
    </Auth0Provider>
   

    
            </Router>

    </LoadScriptApi>
  </MantineProvider>
    </div>
  )
}