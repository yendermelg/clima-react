import { useState } from "react";
import ListaCiudades from "./componentes/ListaCiudades";
import {useFetch} from "./hooks/useFetch";

function App() {
  const [texto, setTexto] = useState("");

  const textoLimpio = texto.trim();
  const url = textoLimpio.length >= 3 ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(textoLimpio)}&count=5&language=es` : null;
  
  const ciudades = useFetch(url);
  const lista = ciudades.datos?.results ?? [];

  const buscable = url != null;

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

      <ListaCiudades ciudades={lista} />
    </div>
  );
}

export default App;
