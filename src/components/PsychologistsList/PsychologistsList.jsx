import PsychologistsListItem from "../PsychologistsListItem/PsychologistsListItem.jsx";

import css from "./PsychologistsList.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectPsychologists,
  selectTotalPages,
} from "../../redux/psychologists/selectors.js";
import {
  startFetchPsychologists,
  // testFn,
} from "../../redux/psychologists/operations.js";

const PsychologistsList = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const [page] = useState(1);
  const totalPages = useSelector(selectTotalPages);
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
      {page < totalPages && (
        <button className={css.btnLoadMore} type="button">
          Load more
        </button>
      )}
    </>
  );
};

export default PsychologistsList;
