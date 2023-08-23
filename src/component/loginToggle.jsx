
import { Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';



import { useAuth0 } from "@auth0/auth0-react";




export const LoginToggle = ({className}) => {
    const [value, toggle] = useToggle(['login', 'logout']);
  const { logout, loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  //  if (isLoading){ return <Loader size="lg" />;}


  const handleLogoutClick = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleToggleClick = (e) => {
    e.preventDefault()
    toggle()
   
    if (isAuthenticated) {
      handleLogoutClick();
    } else {
        loginWithRedirect();
    }
  };
  
  return (

    <Button className={className}  onClick={handleToggleClick}> 

    {isAuthenticated  ? 'Logout' : 'login'}
  </Button>
       
     
  );
};
