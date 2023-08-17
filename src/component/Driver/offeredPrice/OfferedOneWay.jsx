import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AvailableTripsTable = () => {
  const { user, isAuthenticated } = useAuth0();

  // Verifica si el usuario está autenticado
  if (!isAuthenticated) {
    return <div>Inicia sesión para acceder al formulario.</div>;
  }

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchTrips = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/GetAvailableOneWay/${user.sub}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrips(); // Llamamos a la función al cargar el componente
  }, [user.sub]); // Cambiado de "company_id" a "user.sub"

  return (
    <div>
      {trips.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Number of Passengers</th>
              <th>From Address</th>
              <th>To Address</th>
              <th>Departure Date</th>
              <th>Day of the Week</th>
              <th>Departure Hour</th>
              <th>Passenger Name</th>
              <th>Passenger Mail</th>
              <th>Passenger Cell</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index}>
                <td>{trip.number_of_passengers}</td>
                <td>{trip.from_address}</td>
                <td>{trip.to_address}</td>
                <td>{trip.departure_date}</td>
                <td>{trip.day_week}</td>
                <td>{trip.departure_hour}</td>
                <td>{trip.passenger_name}</td>
                <td>{trip.passenger_mail}</td>
                <td>{trip.passenger_cell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No trips available for the given user</p>
      )}
    </div>
  );
};
