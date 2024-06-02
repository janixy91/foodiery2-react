import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../../../constants/enviroment";

const PlacesSearch = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlaces = async () => {
    const location = "40.712776,-74.005974"; // Coordenadas de Nueva York
    const radius = 1000; // Radio en metros
    const type = "restaurant"; // Tipo de lugar

    const url = `/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${API_KEY}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setPlaces(response.data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Restaurantes Cercanos en Nueva York</h1>
      <button onClick={fetchPlaces} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
      {error && <p>Error: {error}</p>}
      <ul>
        {places.map((place) => (
          <li key={place.place_id}>
            <h2>{place.name}</h2>
            <p>{place.vicinity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesSearch;
