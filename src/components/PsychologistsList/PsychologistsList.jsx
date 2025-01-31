import PsychologistsListItem from "../PsychologistsListItem/PsychologistsListItem.jsx";

import css from "./PsychologistsList.module.css";

import { useSelector } from "react-redux";
import { selectPsychologists } from "../../redux/psychologists/selectors.js";

const PsychologistsList = () => {
  const psychologists = useSelector(selectPsychologists);

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
