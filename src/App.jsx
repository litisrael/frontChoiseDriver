import {
  MantineProvider,
  Text,
  Button,
  Paper,
  Loader,
  ColorSchemeProvider,
} from "@mantine/core";

import { BrowserRouter as Router } from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";
import { LoadScriptApi } from "./context/apis/LoadScript";
import { Pages } from "./pages/Pages";
// import { PublicPages } from "./pages/PublicPages";
import { ConditionalHeaderContainer } from "./component/Conditional";

const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;

const redirectUri = window.location.href;

export default function App() {
  return (

      <MantineProvider>
        <LoadScriptApi>
       

            <Auth0Provider
              domain={domain}
              clientId={clientId}
              authorizationParams={{ redirect_uri: window.location.href }}
              >
              <Router>
              <ConditionalHeaderContainer />
              <Pages />
          </Router>
            </Auth0Provider>
        </LoadScriptApi>
      </MantineProvider>
  
  );
}
