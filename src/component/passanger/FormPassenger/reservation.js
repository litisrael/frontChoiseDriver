
// const apiBaseUrl = import.meta.env.VITE_API_URL ||"http://localhost:4000/"

export const updatePassenger = async (auth0Id, formValues) => {
    try {
      const updatedPassengerRes = await fetch(
        `${window.apiBaseUrl}passenger/${auth0Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
  
      if (updatedPassengerRes.ok) {
        console.log("Passenger updated successfully");
      } else {
        console.error("Failed to update passenger");
      }
      return updatedPassengerRes.json()
    } catch (error) {
      console.log("Error updating passenger:", error.message);
    }
  };
  
// Función para realizar la operación de creación (POST) del pasajero
export const createPassenger = async (values) => {
 
    const passengerResponse = await fetch(`${window.apiBaseUrl}passenger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
      const newPassengerData = await passengerResponse.json();
console.log("newPassengerData.id",newPassengerData);
      return newPassengerData.id; // Devuelve el id del pasajero recién creado

     
    }

  


export async function prepareReservationData(passengerData,formOneWay) {
  const reservationData = {
    ...formOneWay.values,
    passenger_id: passengerData.id,
    coordinates_origin: {
      type: "Point",
      coordinates: formOneWay.values.coordinates_origin
        .split(",")
        .map(parseFloat),
    },
    coordinates_destine: {
      type: "Point",
      coordinates: formOneWay.values.coordinates_destine
        .split(",")
        .map(parseFloat),
    },
    // Resto de los datos de la reserva...
  };
console.log("reservationData",reservationData);
  return reservationData;
}

export async function findOrCreatePassengerAccount(FormPassenger, formOneWay) {
  try {
    
    const auth0Id = FormPassenger.values.auth_id;


    const passengerRes = await fetch(`${window.apiBaseUrl}passenger/${auth0Id}`, {
      method: "GET",
    });

    if (!passengerRes.ok) {
      // Si no se encuentra el pasajero, crea uno nuevo
      const newPassengerId = await createPassenger(FormPassenger.values);

      console.log( "newPassengerId",newPassengerId);
      const passengerData = {
        ...FormPassenger.values,
        id: newPassengerId,
      };
      console.log("passengerData",passengerData);
      return await prepareReservationData(passengerData, formOneWay);
    } else {
      const passengerData = await passengerRes.json();

      if (
        formOneWay.values.passenger_name === passengerData.passenger_name &&
        formOneWay.values.passenger_mail === passengerData.passenger_mail &&
        formOneWay.values.passenger_cell === passengerData.passenger_cell
      ) {
        // Si los datos del pasajero no han cambiado, preparar los datos de la reserva directamente
        return await prepareReservationData(passengerData, formOneWay);
      } else {
        // Si los datos del pasajero han cambiado, actualizar el pasajero y luego preparar los datos de la reserva

        const updatedPassengerRes = await updatePassenger(auth0Id, FormPassenger.values);

        return await prepareReservationData(updatedPassengerRes, formOneWay);
      }
    }
  } catch (error) {
    console.error("Error processing reservation:", error);
    throw error;
  }
}
