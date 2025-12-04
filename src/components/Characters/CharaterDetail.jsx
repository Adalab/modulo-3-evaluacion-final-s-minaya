import { Link, useParams } from "react-router";

// Iconos para el estado
import alive from "../../images/state/vivo.png";
import dead from "../../images/state/tumba.png";

// Iconos para las especies
import human from "../../images/species/wizard-hat.png";
import werewolf from "../../images/species/hombre-lobo.png";
import giant from "../../images/species/gigante.png";
import ghost from "../../images/species/fantasma.png";

// Iconos para el género
import male from "../../images/gender/genero-masculino.png";
import female from "../../images/gender/genero-femenino.png";
import other from "../../images/gender/brilla.png";

// Iconos de casas
import Gryffindor from "../../images/houses/leon.png";
import Slytherin from "../../images/houses/serpiente.png";
import Ravenclaw from "../../images/houses/cuervo.png";
import Hufflepuff from "../../images/houses/tejon.png";

function CharacterDetail({ findCharacter }) {
  // useParams para acceder al id dinámico de la URL
  const params = useParams();
  const characterId = params.characterId;

  // Buscamos el personaje mediante la función recibida por props
  const foundCharacter = findCharacter(characterId);

  // Si el personaje aún no está disponible, mostramos loader
  if (foundCharacter === undefined) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Cargando personaje…</p>
      </div>
    );
  }

  // Creamos objetos para relacionar los iconos y obtenerlos de manera dinámica

  // Iconos para el estado
  const statusIcons = {
    true: alive,
    false: dead,
  };

  // Iconos para las especies
  const speciesIcons = {
    human,
    werewolf,
    giant,
    ghost,
  };

  // Iconos para el género
  const genderIcons = {
    male,
    female,
    other,
  };

  // Convertimos a minúsculas para que todo coincida (formato API, iconos, filtros y clases)
  const houseIcons = {
    gryffindor: Gryffindor,
    slytherin: Slytherin,
    ravenclaw: Ravenclaw,
    hufflepuff: Hufflepuff,
  };
  const houseKey = foundCharacter.house.toLowerCase();

  // Algunas especies vienen como "half-giant": lo convertimos en una key uniforme
  const specieKey =
    foundCharacter.specie.toLowerCase() === "half-giant"
      ? "giant"
      : foundCharacter.specie.toLowerCase();

  return (
    <section className="detail">
      {/* Botón para volver al listado */}
      <Link to="/" className="detail__back">
        Retroceda
        <i className="fa-solid fa-wand-sparkles"></i>
      </Link>

      {/* Añadimos una clase dinámica para colorear la tarjeta según la casa */}
      <div className={`detail__card detail__card--${houseKey}`}>
        {/* Si hay imagen del personaje, la mostramos...*/}
        {foundCharacter.image ? (
          <img
            className="detail__img"
            src={foundCharacter.image}
            alt={`Foto de ${foundCharacter.name}`}
          />
        ) : (
          // Si no, mostramos un mensaje alternativo
          <span className="detail__img card__img--noimg">
            El ministerio no envió la foto a tiempo.
          </span>
        )}

        <div className="detail__content">
          <h2 className="detail__title">{foundCharacter.name}</h2>

          <ul className="detail__info">
            {/* Estado */}
            <li>
              <strong>Estado: </strong>{" "}
              {foundCharacter.status ? "Vivo" : "Muerto"}
              <img
                className="detail__icon"
                src={statusIcons[foundCharacter.status]}
                alt={foundCharacter.status ? "Vivo" : "Muerto"}
              />
            </li>

            {/* Especie */}
            <li>
              <strong>Especie: </strong> {foundCharacter.specie}
              <img
                className="detail__icon"
                src={speciesIcons[specieKey]}
                alt={foundCharacter.specie}
              />
            </li>

            {/* Género */}
            <li>
              <strong>Género: </strong> {foundCharacter.gender}
              <img
                className="detail__icon"
                src={genderIcons[foundCharacter.gender]}
                alt={foundCharacter.gender}
              />
            </li>

            {/* Casa */}
            <li>
              <strong>Casa: </strong> {foundCharacter.house}
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
