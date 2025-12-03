import { Link, useParams } from "react-router";

// Estado
import alive from "../../images/state/vivo.png";
import dead from "../../images/state/tumba.png";

// Especies
import human from "../../images/species/wizard-hat.png";
import werewolf from "../../images/species/hombre-lobo.png";
import giant from "../../images/species/gigante.png";
import ghost from "../../images/species/fantasma.png";

// Género
import male from "../../images/gender/genero-masculino.png";
import female from "../../images/gender/genero-femenino.png";
import other from "../../images/gender/brilla.png";

// Casas
import Gryffindor from "../../images/houses/leon.png";
import Slytherin from "../../images/houses/serpiente.png";
import Ravenclaw from "../../images/houses/cuervo.png";
import Hufflepuff from "../../images/houses/tejon.png";

function CharacterDetail({ findCharacter }) {
  const params = useParams();

  const characterId = params.characterId;
  const foundCharacter = findCharacter(characterId);

  const statusIcons = {
    true: alive,
    false: dead,
  };

  const speciesIcons = {
    human,
    werewolf,
    giant,
    ghost,
  };

  const genderIcons = {
    male,
    female,
    other,
  };

  const houseIcons = {
    gryffindor: Gryffindor,
    slytherin: Slytherin,
    ravenclaw: Ravenclaw,
    hufflepuff: Hufflepuff,
  };

  const houseKey = foundCharacter.house.toLowerCase();
  const specieKey =
    foundCharacter.specie.toLowerCase() === "half-giant"
      ? "giant"
      : foundCharacter.specie.toLowerCase();

  return (
    <section className="detail">
      <Link to="/" className="detail__back">
        {" "}
        Retroceda
        <i className="fa-solid fa-wand-sparkles"></i>
      </Link>

      <div className={`detail__card detail__card--${houseKey}`}>
        {foundCharacter.image ? (
          <img
            className="detail__img"
            src={foundCharacter.image}
            alt={`Foto de ${foundCharacter.name}`}
          />
        ) : (
          <span className="detail__img card__img--noimg">
            El ministerio no envió la foto a tiempo.
          </span>
        )}

        <div className="detail__content">
          <h2 className="detail__title">{foundCharacter.name}</h2>

          <ul className="detail__info">
            <li>
              <strong>Estado:</strong>{" "}
              {foundCharacter.status ? "Vivo" : "Muerto"}
              <img
                className="detail__icon"
                src={statusIcons[foundCharacter.status]}
                alt={foundCharacter.status ? "Vivo" : "Muerto"}
              />
            </li>
            <li>
              <strong>Especie:</strong> {foundCharacter.specie}
              <img
                className="detail__icon"
                src={speciesIcons[specieKey]}
                alt={foundCharacter.specie}
              />
            </li>
            <li>
              <strong>Género:</strong> {foundCharacter.gender}
              <img
                className="detail__icon"
                src={genderIcons[foundCharacter.gender]}
                alt={foundCharacter.gender}
              />
            </li>
            <li>
              <strong>Casa:</strong> {foundCharacter.house}
              <img
                className="detail__icon"
                src={houseIcons[houseKey]}
                alt={`Foto de ${foundCharacter.house}`}
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CharacterDetail;
