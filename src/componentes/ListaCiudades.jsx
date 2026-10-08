function ListaCiudades({ ciudades, onElegir }) {
  return (
    <ul>
      {ciudades.map((ciudad) => (
        <li key={ciudad.id} onClick={() => onElegir(ciudad)}>
          {ciudad.name}, {ciudad.admin1}, {ciudad.country}
        </li>
      ))}
    </ul>
  );
}

export default ListaCiudades;
