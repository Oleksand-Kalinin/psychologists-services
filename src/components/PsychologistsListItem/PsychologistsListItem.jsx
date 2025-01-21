import sprite from "../../images/sprite.svg";
import css from "./PsychologistsListItem.module.css";

const PsychologistsListItem = ({ item }) => {
  return (
    <li className={css.item}>
      <div className={css.wrapperAvatar}>
        <img className={css.avatar} src={item.avatar_url} alt="" />
      </div>

      <div className={css.wrapperInfo}>
        <div className={css.wrapperMainInfo}>
          <div className={css.wrapperName}>
            <p className={css.profession}>Psychologist</p>
            <h3 className={css.name}>{item.name}</h3>
          </div>

          <div className={css.wrapperRatingPrice}>
            <div className={css.wrapperRating}>
              <svg className={css.iconStar}>
                <use href={`${sprite}#star-icon`}></use>
              </svg>
              <p>Rating: {item.rating}</p>
            </div>
            <p className={css.price}>
              Price / 1 hour:{" "}
              <span className={css.acceptColorGreen}>
                {item.price_per_hour}$
              </span>
            </p>
          </div>

          <button className={css.btnFavorite} type="button">
            <svg className={css.iconHeart}>
              {" "}
              <use href={`${sprite}#heart-icon`}></use>
            </svg>
          </button>
        </div>

        <ul className={css.wrapperAdditionalInfo}>
          <li className={css.additionalInfoItem}>
            <span className={css.acceptColorGrey}>Experience:</span>{" "}
            {item.experience}
          </li>
          <li className={css.additionalInfoItem}>
            <span className={css.acceptColorGrey}>License:</span> {item.license}
          </li>
          <li className={css.additionalInfoItem}>
            <span className={css.acceptColorGrey}>Specialization:</span>{" "}
            {item.specialization}
          </li>
          <li className={css.additionalInfoItem}>
            <span className={css.acceptColorGrey}>Initial_consultation:</span>{" "}
            {item.initial_consultation}
          </li>
        </ul>

        <p className={css.about}>{item.about}</p>
      </div>
    </li>
  );
};

export default PsychologistsListItem;
