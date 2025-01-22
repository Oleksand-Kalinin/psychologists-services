import PsychologistsListItem from "../PsychologistsListItem/PsychologistsListItem.jsx";

import css from "./PsychologistsList.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPsychologists } from "../../redux/psychologists/selectors.js";
import { startFetchPsychologists } from "../../redux/psychologists/operations.js";

const PsychologistsList = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);

  useEffect(() => {
    dispatch(startFetchPsychologists());
  }, [dispatch]);

  return (
    <ul className={css.list}>
      {psychologists.items.map((item) => (
        <PsychologistsListItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default PsychologistsList;
