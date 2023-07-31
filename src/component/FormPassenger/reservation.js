export const updatePassenger = async (auth0Id, formValues) => {
    try {
      const updatedPassengerRes = await fetch(
        `http://localhost:4000/passenger/${auth0Id}`,
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
 
    const passengerResponse = await fetch("http://localhost:4000/passenger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
      const newPassengerData = await passengerResponse.json();
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

  return reservationData;
}

