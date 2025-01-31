import Container from "../Container/Container.jsx";
import FiltersBtn from "../FiltersBtn/FiltersBtn.jsx";
import Section from "../Section/Section.jsx";

import css from "./PsychologistsSection.module.css";
import PsychologistsList from "../PsychologistsList/PsychologistsList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectError,
  selectFavoritePsychologists,
  selectFavoriteTotalPages,
  selectIsLoading,
  selectPsychologists,
  selectTotalPages,
} from "../../redux/psychologists/selectors.js";
import {
  fetchFavoriteIds,
  fetchPsychologists,
} from "../../redux/psychologists/operations.js";
import { useLocation, useSearchParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

const PsychologistsSection = () => {
  const location = useLocation();
  const locationPathName = location.pathname;

  const [searchParams] = useSearchParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const filterSearchParam = searchParams.get("filter");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const psychologists = useSelector(
    locationPathName === "/psychologists"
      ? selectPsychologists
      : selectFavoritePsychologists
  );
  const totalPages = useSelector(
    locationPathName === "/psychologists"
      ? selectTotalPages
      : selectFavoriteTotalPages
  );

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleClickLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    dispatch(
      fetchPsychologists({
        filterSearchParam,
        page: page + 1,
        locationPathName,
      })
    );
  };

  useEffect(() => {
    setPage(1);
    dispatch(fetchPsychologists({ filterSearchParam, locationPathName }));
  }, [dispatch, filterSearchParam, locationPathName]);

  useEffect(() => {
    dispatch(fetchFavoriteIds());
  }, [dispatch, isLoggedIn]);

  return (
    <Section className={css.psychologistsSection}>
      <Container>
        <h2 className="visually-hidden">Psychologists</h2>
        {isLoading && psychologists.items.length === 0 && <p>Loading...</p>}
        {!error && (
          <>
            {psychologists.items.length > 0 && (
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
            {!isLoading && psychologists.items.length === 0 && (
              <p>No psychologists found</p>
            )}
          </>
        )}
        {error && <p>{error}</p>}
      </Container>
    </Section>
  );
};

export default PsychologistsSection;
