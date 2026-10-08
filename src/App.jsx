import { useState } from "react";
import ListaCiudades from "./componentes/ListaCiudades";
import Pronostico from "./componentes/Pronostico";
import {useFetch} from "./hooks/useFetch";

function App() {
  const [texto, setTexto] = useState("");
  const [ciudad, setCiudad] = useState(null);

  const textoLimpio = texto.trim();
  const url = textoLimpio.length >= 3 ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(textoLimpio)}&count=5&language=es` : null;
  
  const ciudades = useFetch(url);
  const lista = ciudades.datos?.results ?? [];

  const buscable = url != null;

  const urlPronostico = ciudad != null ? `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitude}&longitude=${ciudad.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto` : null;

  const pronostico = useFetch(urlPronostico);

  return (
    <div>
      <h1>Clima</h1>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Busca una ciudad"
      />
      <button onClick={() => setTexto("")}>Limpiar</button>

      {ciudades.cargando && <p>Buscando…</p>}
      {ciudades.error && <p>Error: {ciudades.error}</p>}
      {!ciudades.cargando && !ciudades.error && buscable && lista.length === 0 && (
        <p>Sin resultados</p>
      )}

      <ListaCiudades ciudades={lista} onElegir={setCiudad} />

      {pronostico.cargando && <p>Cargando pronóstico…</p>}
      {pronostico.error && <p>Error: {pronostico.error}</p>}
      {ciudad != null && pronostico.datos != null && (
        <Pronostico ciudad={ciudad} datos={pronostico.datos} />
      )}
    </div>
  );
}

export default App;
