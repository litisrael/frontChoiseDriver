import { MantineProvider, Text, Button ,Paper,Loader, ColorSchemeProvider } from '@mantine/core';

import  {Cards}  from "./component/card.jsx";
import LigtAndDarckButton from './component/ligthButtondark';
import { Buttons } from './component/button';
import { AppShellExample } from "./component/appShell";

export default function App() {
  
  return (
    <div className='App'>
  <MantineProvider> 
    <ColorSchemeProvider>

    <AppShellExample />
  {/* <LigtAndDarckButton/> */}
   
  </ColorSchemeProvider>
  </MantineProvider>
    </div>
  )
}