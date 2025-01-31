import PsychologistsListItem from "../PsychologistsListItem/PsychologistsListItem.jsx";

import css from "./PsychologistsList.module.css";

import { useSelector } from "react-redux";
import {
  selectFavoritePsychologists,
  selectPsychologists,
} from "../../redux/psychologists/selectors.js";
import { useLocation } from "react-router-dom";

const PsychologistsList = () => {
  const location = useLocation();
  const psychologists = useSelector(
    location.pathname === "/psychologists"
      ? selectPsychologists
      : selectFavoritePsychologists
  );

  return (
    <>
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
