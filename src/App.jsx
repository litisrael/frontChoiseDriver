import { MantineProvider, Text, Button ,Paper,Loader, ColorSchemeProvider } from '@mantine/core';


import { AppShellExample } from "./component/appShell";

export default function App() {
  
  return (
    <div className='App'>
  <MantineProvider> 
    <ColorSchemeProvider>

    <AppShellExample />
  
   
  </ColorSchemeProvider>
  </MantineProvider>
    </div>
  )
}