
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { HeaderDriver } from "../component/principal/HeaderDriver";

export const DriverPages = () => {
  return (
    <Routes>
      <Route path="/drivers" element={<HeaderDriver />} />
      
    </Routes>
  );
};
