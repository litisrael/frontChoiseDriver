
const apiBaseUrl = "http://localhost:4000/" || import.meta.env.VITE_API_URL 

export const hoursArray = [ "HH:MM",
    '00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45',
    '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45',
    '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45',
    '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45',
    '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
    '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45',
    '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45',
    '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'
  ];


  export const getCompanyData = async (userId) => {
    const url = `${apiBaseUrl}Register/${userId}`;
    
    try {
      const res = await fetch(url);
      const responseData = await res.json();
  
      if (res.status === 200) {
        return responseData.company;
      } else {
        console.error("The server responded with an error", responseData);
        return null;
      }
    } catch (error) {
      console.log("This is what went wrong:", error.message);
      return null;
    }
  };
  export const queryGetMulti = async (route,param = '') => {
    try {
      const response = await fetch(
        `${route}/${param}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  export const getDataDriver = async (userId) => {
    try {
      const response = await fetch( `${apiBaseUrl}Register/${userId}`)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
  
      if (response.status === 200) {
        console.log("Success!", responseData);
        return responseData; // Devolver los datos recibidos
      } 
    } catch (error) {
      console.log("This is what went wrong:", error.message);
      return null; // Devolver nulo en caso de error
    }
  };


  export const getDataById = async (url,userId) => {
    try {
      const response = await fetch(
        `${url}/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };




  export async function sendDataToServer(url, method, data) {
    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const responseData = await res.json();
  
      if (res.status === 200) {
        console.log("Success!", responseData);
        return true;
      } else {
        console.error("The server responded with an error", responseData);
        return false;
      }
    } catch (error) {
      console.log("This is what went wrong:", error.message);
      return false;
    }
  }
  // console.log(await queryDriversOfferedOneWay( "google-oauth2|104855243921331044464"))




export  const postOfferPriceDriverOneWay = async (id_one_way,company_id, company_name, driver_price,) => {
    try {
      const res = await fetch(`${apiBaseUrl}responseoneway/${id_one_way}`, {
        method: "POST",
        body: JSON.stringify({
          // id_one_way,
          company_id,
          company_name,
          driver_price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const responseData = await res.json();
  
      if (res.status === 200) {
        // formCompany.reset(); // Resetea el formulario de la compañía
        console.log("Success!", responseData);
      } else {
        console.error("The server responded with an error", responseData);
      }
    } catch (error) {
      console.log("This is what went wrong:", error.message);
    }
  };

















