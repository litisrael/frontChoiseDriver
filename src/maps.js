import { useJsApiLoader, LoadScript, GoogleMap } from "@react-google-maps/api";

const center = { lat: 31.76904, lng: 35.21633 };
const clave = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Declarar la constante libraries fuera del componente
const libraries = ["places"];

export function MyMapComponent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: clave,
    libraries: libraries, // Pasar la constante libraries aquí
  });

  if (!isLoaded) {
    return <p>Cargando...</p>;
  }

  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* Contenido del mapa, como marcadores, polígonos, etc. */}
    </GoogleMap>
  );
}

export function MyMapWithLoadScript() {
  return (
    <LoadScript googleMapsApiKey={clave} libraries={libraries}>
      <MyMapComponent />
    </LoadScript>
  );
}
