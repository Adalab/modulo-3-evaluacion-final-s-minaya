import { Link } from "react-router";

function CharacterCard({ eachCharacter }) {
  return (
    <li className="card">
      {/* Para navegar a la página de detalle del personaje, usamos su id para construir una URL única*/}

      <Link to={"/character/" + eachCharacter.id} className="card__link">
        {/* Si el personaje tiene imagen, la mostramos...*/}

        {eachCharacter.image ? (
          <img
            className="card__img"
            src={eachCharacter.image}
            alt={"Foto de " + eachCharacter.name}
          />
        ) : (
          // Si no, mostramos un mensaje
          <span className="card__img card__img--noimg">
            El ministerio no envió la foto a tiempo.
          </span>
        )}

        <h2 className="card__name">{eachCharacter.name}</h2>
        <p className="card__species">{eachCharacter.specie} </p>
        {/* Si existe el actor del personaje, lo mostramos...*/}
        {eachCharacter.actor ? (
          <p className="card__actor">{eachCharacter.actor}</p>
        ) : (
          // Si no, mostramos un mensaje alternativo para no dejar el espacio vacío
          <span className="card__species">Registros muggle incompletos</span>
        )}
      </Link>
    </li>
  );
}

export default CharacterCard;
