import { useState, useEffect } from "react";
import {
  Stepper,
  Button,
  Group,
  Flex,
  TextInput,
  Grid,
  Text,
  PasswordInput,
  Box,
  Code,
} from "@mantine/core";
// import { Maps } from "../../../context/apis/Maps";
import { useForm } from "@mantine/form";
import { NewFormCompany } from "../addCompany/FormCompany";
import { Vehicule } from "../addCompany/Vehicles";
import { User } from "../../User";
import {getCompanyData  } from "../../../data/data.js";

import { useAuth0 } from "@auth0/auth0-react";
import { LoginToggle } from "../../loginToggle";

const apiBaseUrl = "http://localhost:4000/" || import.meta.env.VITE_API_URL 

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const allDaysData = days.map((day) => {
  return {
    day,
    data: [
      {
        unavailable_starting: null,
        unavailable_until: null,
        vehicle_id: "",
      },
    ],
  };
});


export function UpdateFormCompany() {
  const { user, isAuthenticated } = useAuth0();
  
  
  if (!isAuthenticated) {
    return (
      <Text>
        Please log in to access the form. <User />
      </Text>
    );
  }
  const [companyData, setCompanyData] = useState(null);



  const formCompany = useForm({
    initialValues: {
      auth_id: user.sub,
      company_name: "",
      company_cell: "",
      company_mail: "",
      address_company:"",
      work_zone: "",
      radius: 0,
    },
  });

  const formVehicle = useForm({
    initialValues: {
      vehicle: [
        {
          number_of_seats: "",
          mispar_rishuy: "",
          build_date: "",
          overtime_price: "",
          company_id: "",
          shomer_shabat: null,
          is_available_work_multiple_days: null,
        },
      ],
    },
  });

  const formDays = useForm({
    initialValues: {
      days: [...allDaysData],
    },
  });

  const calendarDisableTourist = useForm({
    initialValues: {
      calendarDisable: [{ disable_from: null, disable_until: null }],
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      handleFetchData(); // Realizar la solicitud y obtener los datos
    }
  }, [isAuthenticated]); // Pasa un array vacío para que el efecto se ejecute solo una vez

    const handleFetchData = async () => {
    
      const responseData = await getCompanyData(user.sub);
      if (responseData) {
        setCompanyData(responseData);
  console.log("responseData", responseData);
      }
     
          setCompanyData(responseData)
          
      //     formCompany.setValues({
      //       // auth_id: responseData.company.auth_id,
      //       company_name: responseData.company_name,
      //       company_cell: responseData.company_cell,
      //       company_mail: responseData.company_mail,
      //       address_company: responseData.address_company,
      //       radius: responseData.radius,
      //       work_zone: responseData.work_zone,
      //     });
    
      //     const vehiclesData = responseData.Vehicles[0];
      //     console.log("vehiclesData", vehiclesData);

      //     // Mapea los datos de los vehículos a la estructura que necesitas
      //     const availabilityDataByDay = days.map((day) => {
      //       const vehicleAvailabilities = vehiclesData[0][day]; // Accede a la disponibilidad por día
          
      //       return {
      //         day,
      //         data: vehicleAvailabilities.map((availability) => ({
      //           unavailable_starting: availability.unavailable_starting,
      //           unavailable_until: availability.unavailable_until,
      //           vehicle_id: availability.vehicle_id,
      //         })),
      //       };
      //     });
          
      //     // Ahora actualiza los valores en el formulario formDays
      //     formDays.setValues({
      //       days: availabilityDataByDay,
      //     });
      //  console.log("formDays.values," ,formDays.values);
      }
    
  return (
    <Box component="form">
      <NewFormCompany formCompany={formCompany} />
      {/* Resto de tu código */}
      {/* <Button onClick={handleFetchData}> bla </Button> */}
    </Box>
  );
}
