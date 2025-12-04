function Filters({ filters, setFilters, hogwartsHouses, allStates }) {
  // FUNCIONES MANEJADORAS DE EVENTOS

  // Reinicia todos los filtros a su estado inicial
  const handleReset = () => {
    setFilters({
      name: "",
      image: false,
      house: "gryffindor",
      alive: "",
    });
  };

  // Maneja cambios del checkbox "Solo personajes con foto"
  const handleChangeCheckbox = (ev) => {
    setFilters({
      ...filters, // mantenemos el resto de filtros igual...
      image: ev.target.checked, // actualizamos image según esté marcado (true/false)
    });
  };

  // Evita que el formulario recargue la página al pulsar Enter
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  // Maneja los filtros que provienen de inputs y selects

  // ev.target.id coincide exactamente con el nombre del filtro, así evitamos hacer una función por cada input
  const handleFilter = (ev) => {
    setFilters({
      ...filters, // mantenemos el resto de filtros igual...
      [ev.target.id]: ev.target.value, // actualizamos solo la propiedad cuyo id coincide con el input
    });
  };

  return (
    <section className="filters">
      <form onSubmit={handleSubmit} className="filters__form">
        <div className="filters__left">
          {/* Filtro Nombre/Actor: actualiza filters.name */}
          <label className="filters__label" htmlFor="name">
            Busca por personaje o actor
          </label>
          <input
            onInput={handleFilter}
            id="name"
            value={filters.name}
            type="text"
            className="filters__input"
            placeholder="Daniel Radcliffe, Emma Watson..."
          />

          {/* Filtro personajes con foto: actualiza (true/false) en filters.image */}
          <label className="filters__check" htmlFor="image">
            <input
              id="image"
              type="checkbox"
              className="filters__checkbox"
              checked={filters.image}
              onChange={handleChangeCheckbox}
            />
            Solo personajes con foto
          </label>

          {/* Botón para reiniciar TODOS los filtros */}
          <button
            type="button"
            className="filters__resetBtn"
            onClick={handleReset}
          >
            Reiniciar Filtros
          </button>
        </div>

        <div className="filters__right">
          {/* Select de casas: actualiza filters.house. Al cambiar de casa, se ejecuta useEffect en App.jsx */}
          <label className="filters__label" htmlFor="house">
            Selecciona una casa
          </label>
          <select
            onInput={handleFilter}
            id="house"
            value={filters.house}
            className="filters__select"
          >
            {hogwartsHouses.map((eachHouse) => (
              <option key={eachHouse} value={eachHouse}>
                {/* Mayúsculas a la primera letra */}
                {eachHouse[0].toUpperCase() + eachHouse.slice(1)}
              </option>
            ))}
          </select>

          {/* Select de Estado (alive/dead) actualiza filters.alive */}
          <label
            className="filters__label filters__label--bottom"
            htmlFor="alive"
          >
            Estado:
          </label>
          <select
            onInput={handleFilter}
            id="alive"
            value={filters.alive}
            className="filters__select"
          >
            <option value="">Todos</option>
            {allStates.map((eachState) => (
              <option key={eachState} value={eachState}>
                {eachState === "alive" ? "Vivo" : "Muerto"}
              </option>
            ))}
          </select>
        </div>
      </form>
    </section>
  );
}

export default Filters;
