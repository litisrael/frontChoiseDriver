import { useLoadScript } from "@react-google-maps/api";
import Map from "./map";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY 
export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:apiKey ,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
