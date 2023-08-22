
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { FormOneWay } from "../component/passanger/FormOneWay";
import { PricesOfPassenger } from "../component/passanger/PricesOfPassenger";
import {  AvailableTripsTable} from "../component/Driver/offeredPrice/OfferedOneWay";
import { FormAddCompany } from "../component/Driver/addCompany/FormAddCompany";
import { GetDataDriver } from "../component/Driver/update/get1";
import { MantineProvider, Container } from '@mantine/core';

export const Pages = () => {

    return (
      <Container >
      <Routes>
        
        <Route path="/passenger/oneWay" element={<FormOneWay />} />
        <Route path="/passenger/pricesOfPassenger" element={<PricesOfPassenger />} />
       
        <Route path="/drivers/addCompany" element={<FormAddCompany />} />
        
        <Route path="/drivers/offerPrice" element={< AvailableTripsTable />} />
        <Route path="/drivers/updateCompany" element={< GetDataDriver />} />
      </Routes>
      </Container>
    );
  };
  