
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { FormOneWay } from "../component/passanger/FormPassenger/FormOneWay";
import {  HeaderPassenger} from "../component/passanger/hader/HeaderPassanger";
import { MantineProvider, Container } from '@mantine/core';
import { User } from "../component/User";
export const PublicPages = () => {

    return (
      <Container >
      <Routes>
        
      <Route path="/login" element={<User />} />
     
      {/* <Route path="/passenger/" element={<HeaderPassenger />} /> */}
      </Routes>
      </Container>
    );
  };
  