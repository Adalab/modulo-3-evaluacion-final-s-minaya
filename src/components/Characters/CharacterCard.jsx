import { Link } from "react-router";

function CharacterCard({ eachCharacter }) {
  return (
    <li className="card">
      <Link to={"/character/" + eachCharacter.id} className="card__link">
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
        ) : (
          <span className="card__species">Registros muggle incompletos</span>
        )}
      </Link>
    </li>
  );
}

export default CharacterCard;
