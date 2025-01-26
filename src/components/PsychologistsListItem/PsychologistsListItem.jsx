import { useState } from "react";
import sprite from "../../images/sprite.svg";
import css from "./PsychologistsListItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modals/slice.js";
import Modal from "../Modal/Modal.jsx";
import MakeAppointmentForm from "../MakeAppointmentForm/MakeAppointmentForm.jsx";
import { selectModalType } from "../../redux/modals/selectors.js";

const PsychologistsListItem = ({ item }) => {
  const dispatch = useDispatch();
  const typeModal = useSelector(selectModalType);
  const [showMore, setShowMore] = useState(false);

  const handleClickReadMore = () => {
    setShowMore(!showMore);
  };

  const showMakeAppointmentModal = () =>
    dispatch(openModal("makeAppointmentModal"));

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

        <button
          type="button"
          className={css.btnReadMore}
          onClick={handleClickReadMore}
        >
          Read more
        </button>

        {showMore && (
          <>
            <ul className={css.reviewsWrapper}>
              {item.reviews.map((r, index) => {
                return (
                  <li className={css.reviews} key={index}>
                    <div className={css.reviewsAvatar}>
                      {r.reviewer.slice(0, 1)}
                    </div>
                    <p className={css.reviewsName}>{r.reviewer}</p>
                    <div className={css.reviewsRating}>
                      <svg className={css.iconStar}>
                        <use href={`${sprite}#star-icon`}></use>
                      </svg>
                      <p>{r.rating}</p>
                    </div>
                    <p className={css.reviewsComment}>{r.comment}</p>
                  </li>
                );
              })}
            </ul>

            <button
              className={css.btnMakeAppointment}
              type="button"
              onClick={showMakeAppointmentModal}
            >
              Make an appointment
            </button>
          </>
        )}
      </div>
      {typeModal === "makeAppointmentModal" && (
        <Modal>
          <MakeAppointmentForm psychologist={item} />
        </Modal>
      )}
    </li>
  );
};

export default PsychologistsListItem;
