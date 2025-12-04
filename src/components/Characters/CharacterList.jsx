import CharacterCard from "./CharacterCard";

function CharacterList({ filteredCharacters, isLoading }) {
  // Si la API está cargando, no renderizamos el resto del componente hasta que tengamos datos
  if (isLoading === true) {
    return (
      <section className="character-list">
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Cargando personajes…</p>
        </div>
      </section>
    );
  }
  return (
    <section className="character-list">
      {/* Si no hay personajes tras aplicar los filtros, mostramos un mensaje */}
      {filteredCharacters.length === 0 ? (
        <p className="no-results">
          Este personaje aún no ha salido de la cámara de los secretos...
        </p>
      ) : (
        // Si hay resultados, pintamos la lista de tarjetas con los personajes filtrados
        <ul className="character-list__grid">
          {filteredCharacters.map((eachCharacter) => (
            <CharacterCard
              key={eachCharacter.id}
              eachCharacter={eachCharacter}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default CharacterList;
