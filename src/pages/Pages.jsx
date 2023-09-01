
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { FormOneWay } from "../component/passanger/FormPassenger/FormOneWay";
import { PricesOfPassenger } from "../component/passanger/FormPassenger/PricesOfPassenger";
import {  AvailableTripsTable} from "../component/Driver/offeredPrice/OfferedOneWay";
import { FormAddCompany } from "../component/Driver/addCompany/FormAddCompany";
import { GetDataDriver } from "../component/Driver/update/get1";
import { MantineProvider, Container } from '@mantine/core';
import { ExplainPassenger } from "../component/ExplainPassenger";
// import { GetDataDriver } from "../component/Driver/update/get1";
import { ExplainDrivers } from "../component/ExplainDrivers";
// import { User } from "../component/User";
import {  UpdateFormCompany} from "../component/Driver/update/Update";


export const Pages = () => {

    return (
      <Container >
      <Routes>
   
      
      <Route path="/drivers" element={<ExplainDrivers />}/>
      <Route path="/passenger" element={<ExplainPassenger />} />
      <Route path="/" element={<ExplainPassenger />} />
      {/* <Route path="/login" element={<User />} /> */}
        <Route path="/passenger/oneWay" element={<FormOneWay />} />
        <Route path="/passenger/pricesOfPassenger" element={<PricesOfPassenger />} />
       
        <Route path="/drivers/addCompany" element={<FormAddCompany />} />
        
        <Route path="/drivers/offerPrice" element={< AvailableTripsTable />} />
        <Route path="/drivers/updateCompany" element={< UpdateFormCompany />} />
      </Routes>
      </Container>
    );
  };
  