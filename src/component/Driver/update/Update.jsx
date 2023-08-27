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
  const [companyData, setCompanyData] = useState(null);
  const formCompany = useForm({
    initialValues: {
      auth_id: "",
      company_name: "",
      company_cell: "",
      company_mail: "",
      work_zone: "",
      radius: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        try {
          const url = `${apiBaseUrl}Register/${user.sub}`;
          const res = await fetch(url);
          const responseData = await res.json();

          if (res.status === 200) {
            setCompanyData(responseData.company);
            console.log("Success!", responseData);
          } else {
            console.error("The server responded with an error", responseData);
          }
        } catch (error) {
          console.log("This is what went wrong:", error.message);
        }
      }
    }

    fetchData();
  }, [isAuthenticated, user.sub]);

  useEffect(() => {
    if (companyData) {
      formCompany.setValues({
        auth_id: companyData.auth_id,
        company_name: companyData.company_name,
        company_cell: companyData.company_cell,
        company_mail: companyData.company_mail,
        work_zone: companyData.work_zone,
        radius: companyData.radius,
      });
    }
  }, [companyData, formCompany]);

  if (!isAuthenticated) {
    return (
      <Text>
        Please log in to access the form.
      </Text>
    );
  }

  return (
    <Box component="form">
      <NewFormCompany formCompany={formCompany} />
      {/* Resto de tu código */}
    </Box>
  );
}
