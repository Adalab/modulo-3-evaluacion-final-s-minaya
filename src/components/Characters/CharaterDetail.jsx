import { Link, useParams } from "react-router";

function CharacterDetail({ findCharacter }) {
  const params = useParams();
  console.log(params);
  const characterId = params.characterId;

  const foundCharacter = findCharacter(characterId);

  return (
    <section className="detail">
      <Link to="/" className="detail__back">
        <i className="fa-solid fa-chevron-left"></i> Volver
      </Link>

      <div className="detail__card">
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
              <strong>Estado:</strong> {foundCharacter.status ? "Vivo" : "Muerto"}
            </li>
            <li>
              <strong>Especie:</strong> {foundCharacter.specie}
            </li>
            <li>
              <strong>Género:</strong> {foundCharacter.gender}
            </li>
            <li>
              <strong>Casa:</strong> {foundCharacter.house}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CharacterDetail;
