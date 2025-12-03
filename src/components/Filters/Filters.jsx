function Filters({ filters, setFilters, hogwartsHouses, allStates }) {
  // Funciones manejadoras de eventos

  const handleReset = () => {
    setFilters({
      name: "",
      wizard: false,
      house: "gryffindor",
      alive: "",
    });
  };

  const handleChangeCheckbox = (ev) => {
    setFilters({
      ...filters,
      wizard: ev.target.checked,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };
  const handleFilter = (ev) => {
    setFilters({
      ...filters,
      [ev.target.id]: ev.target.value,
    });
  };

  return (
    <section className="filters">
      <form onSubmit={handleSubmit} className="filters__form">
        <div className="filters__left">
          {/* Filtro: Nombre */}
          <label className="filters__label" htmlFor="filter-name">
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

          {/* Filtro: Magos */}
          <label className="filters__check" htmlFor="wizard">
            <input
              id="wizard"
              type="checkbox"
              className="filters__checkbox"
              checked={filters.wizard}
              onChange={handleChangeCheckbox}
            />
            Solo Magos
          </label>

          <button
            type="button"
            className="filters__resetBtn"
            onClick={handleReset}
          >
            Reiniciar Filtros
          </button>
        </div>

        <div className="filters__right">
          {/* Filtro: Casa */}
          <label className="filters__label" htmlFor="filter-house">
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
                {eachHouse[0].toUpperCase() + eachHouse.slice(1)}
              </option>
            ))}
          </select>

          {/* Filtro: Estado */}
          <label
            className="filters__label filters__label--bottom"
            htmlFor="filter-status"
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
