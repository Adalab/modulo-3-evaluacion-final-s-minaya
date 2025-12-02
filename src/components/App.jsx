import { useEffect, useState } from "react";
import "../styles/App.scss";

function App() {
  // DATOS DE LA APP:

  // Personajes
  const [characters, setCharacters] = useState([]);

  // Filtros
  const [filters, setFilters] = useState({
    name: "",
    wizard: false,
    house: "gryffindor",
    alive: "",
  });

  // Loader
  const [isLoading, setIsLoading] = useState(true); // Mostramos el loader mientras carga la página

  // Código que se lanza cuando carga la página:
  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((responseData) => {
        const allCleanCharacters = responseData.map((eachCharacter) => ({
          id: eachCharacter.id,
          name: eachCharacter.name,
          wizard: eachCharacter.wizard,
          gender: eachCharacter.gender,
          house: eachCharacter.house,
          image: eachCharacter.image,
          status: eachCharacter.alive,
          specie: eachCharacter.species,
          actor: eachCharacter.actor,
        }));

        setCharacters(allCleanCharacters);
        setIsLoading(false); // Ocultamos el loader tras cargar la página
      });
  }, []);

  // Funciones manejadoras de eventos

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleFilter = (ev) => {
    setFilters({
      ...filters,
      [ev.target.id]: ev.target.value,
    });
    console.log(ev.target.value);
  };

  const handleChangeCheckbox = (ev) => {
    setFilters({
      ...filters,
      wizard: ev.target.checked,
    });
  };

  const allHouses = characters.map((eachCharacter) => eachCharacter.house); // Saco todas las casas
  const uniqueHouses = [...new Set(allHouses.filter((house) => house !== ""))]; // Elimino vacías
  // Set nos da un conjunto sin duplicados y el spread nos los suelta todos en un array nuevo

  const allStates = [
    ...new Set(
      characters.map((state) => (state.status === true ? "alive" : "dead"))
    ),
  ];

  if (isLoading === true) {
    // Mostramos el loader y no mostramos el resto de la app aún.
    // React hace return aquí y no pasa de esta parte.
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Cargando personajes…</p>
      </div>
    );
  }

  // Código con variables para pintar en la página

  const filteredCharacters = characters
    .filter((eachCharacter) => {
      // Filtro para nombre (personaje o actor)
      const searchText = filters.name.toLocaleLowerCase();
      return (
        eachCharacter.name.toLocaleLowerCase().includes(searchText) ||
        eachCharacter.actor.toLocaleLowerCase().includes(searchText)
      );
    })

    .filter((eachCharacter) => {
      // Filtro para magos.
      if (filters.wizard === true) {
        return eachCharacter.wizard === true; // Si filters.wizard es true, solo pasan los magos.
      }
      return true; // Si filters.wizard es false, no entra al if y pasan todos.
    })

    .filter(
      (
        eachCharacter // Filtro para casa.
      ) =>
        eachCharacter.house
          .toLocaleLowerCase()
          .includes(filters.house.toLocaleLowerCase())
    )

    .filter((eachCharacter) => {
      // Filtro para vivos
      if (filters.alive === "") {
        return true; // Si está vacío, mostrar todos
      }
      if (filters.alive === "alive") {
        return eachCharacter.status === true;
      }
      if (filters.alive === "dead") {
        return eachCharacter.status === false;
      }
    });
  console.log("Filtrados:", filteredCharacters.length, filteredCharacters);

  return (
    <div>
      <header className="header">
        <h1 className="title">Personajes de Harry Potter</h1>
      </header>
      <main className="main">
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
                placeholder="Luna Lovegood, Emma Watson..."
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
                {uniqueHouses.map((eachHouse) => (
                  <option key={eachHouse} value={eachHouse.toLocaleLowerCase()}>
                    {eachHouse}
                  </option>
                ))}
                <option value="">Todas</option>
              </select>

              {/* Filtro: Estado */}
              <label className="filters__label" htmlFor="filter-status">
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

        {/* LISTADO */}
        <section className="character-list">
          {filteredCharacters.length === 0 ? (
            <p className="no-results">
              Este personaje aún no ha salido de la cámara de los secretos...
            </p>
          ) : (
            <ul className="character-list__grid">
              {filteredCharacters.map((eachCharacter) => (
                <li key={eachCharacter.id} className="card">
                  {eachCharacter.image ? (
                    <img
                      className="card__img"
                      src={eachCharacter.image}
                      alt={"Foto de " + eachCharacter.name}
                    />
                  ) : (
                    <span className="card__img card__img--noimg">
                      El ministerio no envió la foto a tiempo.
                    </span>
                  )}

                  <h2 className="card__name">{eachCharacter.name}</h2>
                  <p className="card__species">{eachCharacter.specie} </p>
                  {eachCharacter.actor ? (
                    <p className="card__actor">{eachCharacter.actor}</p>
                  ) : (<span className="card__species">
                      Registros muggle incompletos
                    </span>)}

                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
