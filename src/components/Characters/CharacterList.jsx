import CharacterCard from "./CharacterCard";

function CharacterList({ filteredCharacters }) {
  return (
    <section className="character-list">
      {filteredCharacters.length === 0 ? (
        <p className="no-results">
          Este personaje aún no ha salido de la cámara de los secretos...
        </p>
      ) : (
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
