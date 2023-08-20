import {  HeaderDriver} from "./HeaderDriver";
import {  HeaderPassenger} from "./HeaderPassanger";
import { useState } from "react";
export const ConditionalHeaderContainer = () => {
    const [isPassenger, setIsPassenger] = useState(true);
  
    const toggleHeader = () => {
      setIsPassenger(!isPassenger);
    };
  
    return (
      <div>
        <button onClick={toggleHeader}>
          {isPassenger ? "Show Driver" : "Show Passenger"}
        </button>
        {isPassenger ? <HeaderPassenger /> : <HeaderDriver />}
      </div>
    );
}