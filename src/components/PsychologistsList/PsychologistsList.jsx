import PsychologistsListItem from "../PsychologistsListItem/PsychologistsListItem.jsx";

import css from "./PsychologistsList.module.css";

import { useDispatch, useSelector } from "react-redux";
import { selectPsychologists } from "../../redux/psychologists/selectors.js";
import { useEffect } from "react";
import { fetchFavoriteIds } from "../../redux/psychologists/operations.js";

const PsychologistsList = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);

  useEffect(() => {
    dispatch(fetchFavoriteIds());
  }, [dispatch]);

  return (
    <>
      {psychologists.items.length === 0 && <p>Psychologists not found</p>}
      {psychologists.items.length > 0 && (
        <ul className={css.list}>
          {psychologists.items.map((item) => (
            <PsychologistsListItem item={item} key={item.id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default PsychologistsList;
