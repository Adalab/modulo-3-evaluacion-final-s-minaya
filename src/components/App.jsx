import { useEffect, useState } from "react";
import "../styles/App.scss";

function App() {

  // DATOS DE LA APP:

  //Personajes
  const [characters, setCharacters] = useState([]);
  const [filters, setFilters] = useState ({
    name: "",
    wizard: false,
    house:"",
    alive:"",

  });



// Código que se lanza cuando carga la página:
useEffect(() => {
  console.log("Estado de filters actualizado", filters);
  

fetch('https://hp-api.onrender.com/api/characters')
.then((res)=>res.json())
.then ((responseData) => {
  const allCleanCharacters = responseData.map((eachCharacter) =>({
    id: eachCharacter.id,
    name: eachCharacter.name,
    wizard: eachCharacter.wizard,
    gender: eachCharacter.gender,
    house: eachCharacter.house,
    image: eachCharacter.image,
    status: eachCharacter.alive,
    specie: eachCharacter.species,
    actor: eachCharacter.actor
  }));

  setCharacters(allCleanCharacters)
  
  
});
},[filters]);

  if(characters.length === 0){
    return "No hay personajes para mostrar."
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleFilter = (ev) => {
    setFilters({
      ...filters,
    [ev.target.id]: ev.target.value})
    console.log(ev.target.value);
    
  }

  const handleChangeCheckbox = (ev) => {
    setFilters({
    ...filters,
    wizard: ev.target.checked,
    });

  };

  return (
    <div>
      <header className="header">
        <h1 className="title">Personajes de Harry Potter</h1>
      </header>
      <main className="main">
        <section className="filters">
          <form onSubmit={handleSubmit}className="filters__form">
            <div className="filters__left">
              {/* Filtro: Nombre */}
              <label className="filters__label" htmlFor="filter-name">
                Busca por nombre
              </label>
              <input
                onInput={handleFilter}
                id="name"
                value={filters.name}
                type="text"
                className="filters__input"
                placeholder="Hermione..."
              />

              {/* Filtro: Magos */}
              <label className="filters__check" htmlFor="wizard">
                <input id="wizard" type="checkbox" className="filters__checkbox" checked={filters.wizard} onChange={handleChangeCheckbox}/>
                Solo Magos
              </label>
            </div>

            <div className="filters__right">
              {/* Filtro: Casa */}
              <label className="filters__label" htmlFor="filter-house">
                Selecciona una casa
              </label>     
              <select onInput={handleFilter}id="house" value={filters.house}className="filters__select" >
                <option value="gryffindor">Gryffindor</option>
                <option value="slytherin">Slytherin</option>
                <option value="hufflepuff">Hufflepuff</option>
                <option value="ravenclaw">Ravenclaw</option>
                <option value="">Todas</option>
              </select>

              {/* Filtro: Estado */}
              <label className="filters__label" htmlFor="filter-status">
                Estado:
              </label>
              <select onInput={handleFilter} id="alive" value={filters.alive}className="filters__select" >
                <option value="">Todos</option>
                <option value="alive">Vivo</option>
                <option value="dead">Muerto</option>
              </select>
            </div>
          </form>
        </section>

        {/* LISTADO */}
        <section className="character-list">
          <ul className="character-list__grid">
            {characters.map((eachCharacter) => (
              <li key={eachCharacter.id} className="card">

                {eachCharacter.image ? (
                  <img className="card__img"
                    src={eachCharacter.image}
                    alt={"Foto de " + eachCharacter.name}
                  />
                ) : (
                  <span className="card__img card__img--noimg">El ministerio no envió la foto a tiempo.</span>
                )}

                <h2 className="card__name">{eachCharacter.name}</h2>
                <p className="card__species">{eachCharacter.species} </p>
                <p className="card__actor">{eachCharacter.actor}</p>
              </li>))}

          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
