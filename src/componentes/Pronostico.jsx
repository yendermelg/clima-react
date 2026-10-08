import { describirClima } from "../clima";

function Pronostico({ ciudad, datos }) {
  return (
    <div>
      <h2>{ciudad.name}</h2>
      <p>
        {datos.current.temperature_2m} °C · {describirClima(datos.current.weather_code)} · viento {datos.current.wind_speed_10m} km/h
      </p>

      <ul>
        {datos.daily.time.map((fecha, i) => (
          <li key={fecha}>
            {fecha} · {describirClima(datos.daily.weather_code[i])} · {datos.daily.temperature_2m_min[i]} - {datos.daily.temperature_2m_max[i]} °C
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pronostico;
