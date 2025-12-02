import { useEffect, useState } from "react";
import "../styles/App.scss";

function App() {

  // DATOS DE LA APP:

  //Personajes
  const [characters, setCharacters] = useState([]);



// Código que se lanza cuando carga la página:
useEffect(() => {

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
    state: eachCharacter.alive,
    specie: eachCharacter.species,
    actor: eachCharacter.actor
  }));

  setCharacters(allCleanCharacters)
  
  
});
},[]);

  if(characters.length === 0){
    return "No hay personajes para mostrar."
  }

  return (
    <div>
      <header className="header">
        <h1 className="title">Personajes de Harry Potter</h1>
      </header>
      <main className="main">
        <section className="filters">
          <form className="filters__form">
            <div className="filters__left">
              {/* Filtro: Nombre */}
              <label className="filters__label" htmlFor="filter-name">
                Busca por nombre
              </label>
              <input
                className="filters__input"
                type="text"
                id="filter-name"
                placeholder="Hermione..."
              />

              {/* Filtro: Magos */}
              <label className="filters__check">
                <input type="checkbox" className="filters__checkbox" />
                Solo Magos
              </label>
            </div>

            <div className="filters__right">
              {/* Filtro: Casa */}
              <label className="filters__label" htmlFor="filter-house">
                Selecciona una casa
              </label>     
              <select className="filters__select" id="filter-house">
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
              <select className="filters__select" id="filter-status">
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
