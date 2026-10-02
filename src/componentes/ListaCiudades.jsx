function ListaCiudades({ ciudades }) {
  return (
    <ul>
      {ciudades.map((ciudad) => (
        <li key={ciudad.id}>
          {ciudad.name}, {ciudad.admin1}, {ciudad.country}
        </li>
      ))}
    </ul>
  );
}

export default ListaCiudades;