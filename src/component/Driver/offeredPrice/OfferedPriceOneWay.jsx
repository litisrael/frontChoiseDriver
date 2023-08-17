
export const OfferedOneWay = ({ formData }) => {
  // Aquí muestras la información recibida en el objeto formData
  return (
    <>
      <h2>Form Data</h2>
      <p>Name: {formData.passenger_name}</p>
      <p>Email: {formData.passenger_mail}</p>
      <p>Cell: {formData.passenger_cell}</p>
      <p>Number of Passengers: {formData.number_of_passengers}</p>
      <p>From Address: {formData.from_address}</p>
      <p>To Address: {formData.to_address}</p>
      {/* También puedes mostrar otros datos relacionados con el mapa */}
      <p>Distance: {formData.distance}</p>
      <p>Duration: {formData.duration}</p>
      {/* Y cualquier otro dato necesario */}
    </>
  );
};

export default DisplayFormOneWay;
