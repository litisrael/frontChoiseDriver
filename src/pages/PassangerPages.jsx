
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { FormOneWay } from "../component/passanger/FormOneWay";
import { PricesOfPassenger } from "../component/passanger/PricesOfPassenger";
// import { HeaderDriver } from "../component/principal/HeaderDriver";
export const PassengerPages = () => {

    return (

      <Routes>
        <Route path="/passenger/oneWay" element={<FormOneWay />} />
        <Route path="/passenger/pricesOfPassenger" element={<PricesOfPassenger />} />
        
        {/* <Route path="/passenger/DRIVER" element={<HeaderDriver />} /> */}
      </Routes>
    );
  };
  