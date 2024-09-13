import { useEffect, useRef,useState } from "react";
import leaflet from "leaflet";
import axios from "axios";






export default function Map({ address }) {
  const mapContainerRef = useRef(null); // Referencia al contenedor del mapa
  const mapRef = useRef(null); // Referencia a la instancia del mapa
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Función para obtener coordenadas a partir de una dirección
    const fetchCoordinates = async (address) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        
        if (response.data.length > 0) {
          // Filtrar por país (Colombia) usando `display_name`
          const colombiaResults = response.data.filter((location) =>
            location.display_name.includes("Colombia")
          );
    
          if (colombiaResults.length > 0) {
            const { lat, lon } = colombiaResults[0];
            setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
          } else {
            console.warn("Dirección no encontrada en Colombia");
          }
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates(address);
  }, [address]);

  useEffect(() => {
    // Inicializa el mapa solo si no está ya inicializado
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = leaflet
        .map(mapContainerRef.current)
        .setView([coordinates.lat, coordinates.lng], 13);

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapRef.current);
    }

    // Actualiza la vista del mapa cuando cambian las coordenadas
    if (mapRef.current) {
      mapRef.current.setView([coordinates.lat, coordinates.lng]);
      leaflet
        .marker([coordinates.lat, coordinates.lng])
        .addTo(mapRef.current)
        .bindPopup(address);
    }

    // Cleanup del mapa cuando el componente se desmonte
    return () => {
      if (mapRef.current) {
        mapRef.current.off(); // Elimina todos los listeners de eventos
        mapRef.current.remove(); // Elimina la instancia del mapa
        mapRef.current = null;
      }
    };
  }, [coordinates, address]);

  return (
    <div
      id="map"
      ref={mapContainerRef}
      style={{
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
         width: "50%",
        height: "100%", 
        borderRadius: 20,
        marginInline: 20,
        marginBottom: 5,
      }}
    ></div>
  );
}