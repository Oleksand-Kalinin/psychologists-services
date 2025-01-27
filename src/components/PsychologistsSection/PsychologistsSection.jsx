import Container from "../Container/Container.jsx";
import FiltersBtn from "../FiltersBtn/FiltersBtn.jsx";
import Section from "../Section/Section.jsx";

import css from "./PsychologistsSection.module.css";
import PsychologistsList from "../PsychologistsList/PsychologistsList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectError,
  selectIsLoading,
  selectPsychologists,
  selectTotalPages,
} from "../../redux/psychologists/selectors.js";
import { fetchPsychologists } from "../../redux/psychologists/operations.js";
import { useSearchParams } from "react-router-dom";

const PsychologistsSection = () => {
  const [searchParams] = useSearchParams();
  const filterSearchParam = searchParams.get("filter");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const psychologists = useSelector(selectPsychologists);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleClickLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    dispatch(fetchPsychologists({ filterSearchParam, page: page + 1 }));
    // dispatch(testFn({ filterSearchParam, page: page + 1 }));
  };

  useEffect(() => {
    setPage(1);
    dispatch(fetchPsychologists({ filterSearchParam }));
  }, [dispatch, filterSearchParam]);

  return (
    <Section className={css.psychologistsSection}>
      <Container>
        <h2 className="visually-hidden">Psychologists</h2>
        {isLoading && psychologists.items.length === 0 && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!error && psychologists.items.length > 0 && (
          <>
            <FiltersBtn />
            <PsychologistsList />
            {page < totalPages && (
              <button
                className={css.btnLoadMore}
                type="button"
                onClick={handleClickLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load more"}
              </button>
            )}
          </>
        )}
      </Container>
    </Section>
  );
};

export default PsychologistsSection;
