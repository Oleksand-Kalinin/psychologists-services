import PsychologistsListItem from "../PsychologistsListItem/PsychologistsListItem.jsx";

import css from "./PsychologistsList.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectPsychologists,
} from "../../redux/psychologists/selectors.js";
import {
  startFetchPsychologists,
  // testFn,
} from "../../redux/psychologists/operations.js";

const PsychologistsList = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(startFetchPsychologists());
    // testFn();
  }, [dispatch]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {psychologists.items.map((item) => (
          <PsychologistsListItem item={item} key={item.id} />
        ))}
      </ul>
    </>
  );
};

export default PsychologistsList;
