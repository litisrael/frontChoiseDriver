
import { Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import {
    IconLogout,
    IconLogin,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronDown,
  } from "@tabler/icons-react";

import { useAuth0 } from "@auth0/auth0-react";




export const LoginToggle = ({className}) => {
  const { logout, loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
    // const [value, toggle] = useToggle(isAuthenticated ? 'logout' : 'login')
  //  if (isLoading){ return <Loader size="lg" />;}


  const handleLogoutClick = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleToggleClick = (e) => {
    e.preventDefault()
   
   
    if (!isAuthenticated) {
      loginWithRedirect();
      // toggle()
    } else {
      handleLogoutClick();
      // toggle()
    }
  };
  
  return (


    <Button 
    leftIcon={isAuthenticated  ? <IconLogout size="0.9rem" stroke={1.5} />
    :  <IconLogin size="0.9rem" stroke={1.5} /> }
     className={className}  onClick={handleToggleClick}> 

    {isAuthenticated  ? 'Logout' : 'login'}
  </Button>
       
     
  );
};
