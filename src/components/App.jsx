import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import "../styles/App.scss";
import Filters from "./Filters/Filters";
import CharacterList from "./Characters/CharacterList";
import Header from "./Layout/Header";
import CharacterDetail from "./Characters/CharaterDetail";



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

  // Casas
  const hogwartsHouses = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];

  // Loader
  const [isLoading, setIsLoading] = useState(true); // Mostramos el loader mientras carga la página

  // Código que se lanza cuando carga la página o cambia el filtro:
  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters/house/" + filters.house)
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
  }, [filters.house]);

  // Estados

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
    })
    .sort((firstCharacter, secondCharacter) =>
      firstCharacter.name.localeCompare(secondCharacter.name)
    );
  console.log("Filtrados:", filteredCharacters.length, filteredCharacters);

  return (
    <div>     
      <Header/>
      <main className="main">
        <Routes>
          <Route path="/" element={<> <Filters
          filters={filters}
          setFilters={setFilters}
          hogwartsHouses={hogwartsHouses}
          allStates={allStates}
        />
        <CharacterList filteredCharacters={filteredCharacters} /></>}/>
          <Route path="/character/:id" element={<CharacterDetail/>
          }/>
        </Routes>
       
      </main>
    </div>
  );
}

export default App;
