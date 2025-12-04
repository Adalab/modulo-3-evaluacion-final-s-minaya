import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import "../styles/App.scss";
import Filters from "./Filters/Filters";
import CharacterList from "./Characters/CharacterList";
import Header from "./Layout/Header";
import CharacterDetail from "./Characters/CharaterDetail";

function App() {
  // DATOS DE LA APP:

  // Personajes que trae la API limpios
  const [characters, setCharacters] = useState([]);

  // Filtros seleccionados por la usuaria
  const [filters, setFilters] = useState({
    name: "", // input "Busca por personaje o actor"
    image: false, // checkbox "Solo personajes con foto"
    house: "gryffindor", // select "Selecciona una casa"
    alive: "", // Estado: "", "alive" o "dead"
  });

  // Casas
  const hogwartsHouses = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];

  // Estados
  const allStates = ["alive", "dead"];

  // Loader
  const [isLoading, setIsLoading] = useState(true); // Mostramos el loader mientras carga la página

  // Código que se lanza cuando carga la página o cambia el filtro:
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    fetch("https://hp-api.onrender.com/api/characters/house/" + filters.house)
      .then((res) => res.json())
      .then((responseData) => {
        const allCleanCharacters = responseData.map((eachCharacter) => ({
          // Nos traemos solo los datos que vamos a utlizar de la API y los reestructuramos
          id: eachCharacter.id,
          name: eachCharacter.name,
          gender: eachCharacter.gender,
          house: eachCharacter.house,
          image: eachCharacter.image,
          status: eachCharacter.alive,
          specie: eachCharacter.species,
          actor: eachCharacter.actor,
        }));

        setCharacters(allCleanCharacters); // Ahora characters está limpio
        setIsLoading(false); // Ocultamos el loader tras cargar la página
      });
  }, [filters.house]);

  // Función para encontrar un personaje por ID
  // Se usa en la página de detalle
  const findCharacter = (characterId) => {
    // Si aún no se ha cargado la API devolvemos undefined (CharacterDetail mostrará loader)
    if (characters.length === 0) {
      return undefined;
    }

    // Buscamos el personaje con ese ID
    const character = characters.find(
      (oneCharacter) => oneCharacter.id === characterId
    );
    return character;
  };

  // FILTERED CHARACTERS: Aquí aplicamos TODOS los filtros de la usuaria

  const filteredCharacters = characters
    .filter((eachCharacter) => {
      // 1) Filtro por texto (personaje o actor)
      const searchText = filters.name.toLocaleLowerCase();
      return (
        eachCharacter.name.toLocaleLowerCase().includes(searchText) ||
        eachCharacter.actor.toLocaleLowerCase().includes(searchText)
      );
    })

    .filter((eachCharacter) => {
      // 2) Filtro por checkbox "Solo personajes con foto"
      if (filters.image === true) {
        return eachCharacter.image; // si no tiene foto no pasa
      }
      return true; // si el checkbox está apagado: mostrar todo
    })

    .filter((eachCharacter) => {
      // 3) Filtro por estado (vivo/muerto)
      if (filters.alive === "") {
        return true; // Si está vacío: mostrar todos
      }
      if (filters.alive === "alive") {
        return eachCharacter.status === true;
      }
      if (filters.alive === "dead") {
        return eachCharacter.status === false;
      }
    })
    .sort((firstCharacter, secondCharacter) =>
      // 4) Ordenar alfabeticamente
      firstCharacter.name.localeCompare(secondCharacter.name)
    );

  return (
    <div>
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filters
                  filters={filters}
                  setFilters={setFilters}
                  hogwartsHouses={hogwartsHouses}
                  allStates={allStates}
                />
                <CharacterList
                  filteredCharacters={filteredCharacters}
                  isLoading={isLoading}
                />
              </>
            }
          />
          <Route
            path="/character/:characterId"
            element={<CharacterDetail findCharacter={findCharacter} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
