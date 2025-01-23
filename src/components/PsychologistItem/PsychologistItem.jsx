import { useEffect } from "react";
import Container from "../Container/Container.jsx";
import Section from "../Section/Section.jsx";

import sprite from "../../images/sprite.svg";

import css from "./PsychologistItem.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPsychologistById,
  selectPsychologistByIdLoading,
} from "../../redux/psychologists/selectors.js";
import { fetchPsychologistById } from "../../redux/psychologists/operations.js";
import { clearPsychologistById } from "../../redux/psychologists/slice.js";

const PsychologistItem = () => {
  const id = useParams("id");
  const dispatch = useDispatch();
  const psychologist = useSelector(selectPsychologistById);
  const isLoading = useSelector(selectPsychologistByIdLoading);

  useEffect(() => {
    dispatch(fetchPsychologistById(id));
    return () => {
      dispatch(clearPsychologistById());
    };
  }, [dispatch, id]);

  return (
    <Section className={css.section}>
      <Container className={css.container}>
        {isLoading && <p>Loading...</p>}
        {!isLoading && psychologist && (
          <div className={css.content}>
            <div className={css.wrapperAvatar}>
              <img
                className={css.avatar}
                src={psychologist.avatar_url}
                alt=""
              />
            </div>

            <div className={css.wrapperInfo}>
              <div className={css.wrapperMainInfo}>
                <div className={css.wrapperName}>
                  <p className={css.profession}>Psychologist</p>
                  <h3 className={css.name}>{psychologist.name}</h3>
                </div>

                <div className={css.wrapperRatingPrice}>
                  <div className={css.wrapperRating}>
                    <svg className={css.iconStar}>
                      <use href={`${sprite}#star-icon`}></use>
                    </svg>
                    <p>Rating: {psychologist.rating}</p>
                  </div>
                  <p className={css.price}>
                    Price / 1 hour:{" "}
                    <span className={css.acceptColorGreen}>
                      {psychologist.price_per_hour}$
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
                  {psychologist.experience}
                </li>
                <li className={css.additionalInfoItem}>
                  <span className={css.acceptColorGrey}>License:</span>{" "}
                  {psychologist.license}
                </li>
                <li className={css.additionalInfoItem}>
                  <span className={css.acceptColorGrey}>Specialization:</span>{" "}
                  {psychologist.specialization}
                </li>
                <li className={css.additionalInfoItem}>
                  <span className={css.acceptColorGrey}>
                    Initial_consultation:
                  </span>{" "}
                  {psychologist.initial_consultation}
                </li>
              </ul>

              <p className={css.about}>{psychologist.about}</p>

              {psychologist.reviews.length > 0 && (
                <ul className={css.reviewsWrapper}>
                  {psychologist.reviews.map((r, index) => {
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
              )}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default PsychologistItem;
