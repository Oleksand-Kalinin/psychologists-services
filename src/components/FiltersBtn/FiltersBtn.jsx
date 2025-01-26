import { useEffect, useRef, useState } from "react";
import sprite from "../../images/sprite.svg";
import css from "./FiltersBtn.module.css";
import FiltersPopover from "../FiltersPopover/FiltersPopover.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectSortBy } from "../../redux/filters/selectors.js";
import { useSearchParams } from "react-router-dom";
import { changeFilter } from "../../redux/filters/slice.js";

const FiltersBtn = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const filterSearchParam = searchParams.get("filter");

  const wrapperFiltersRef = useRef(null);
  const filterValue = useSelector(selectSortBy);
  const [showFiltersPopover, setShowFiltersPopover] = useState(false);

  const toggleShowFiltersPopover = () => {
    setShowFiltersPopover(!showFiltersPopover);
  };

  const closeFiltersPopover = () => {
    setShowFiltersPopover(false);
  };

  useEffect(() => {
    dispatch(changeFilter(filterSearchParam));
  }, [dispatch, filterSearchParam]);

  return (
    <>
      <p className={css.text}>Filters</p>

      <div ref={wrapperFiltersRef} className={css.wrapperFiltersBtn}>
        <button
          className={css.filtersBtn}
          type="button"
          onClick={toggleShowFiltersPopover}
        >
          <p>{filterValue}</p>

          {showFiltersPopover ? (
            <svg className={css.icon}>
              <use href={`${sprite}#chevron-up-icon`}></use>
            </svg>
          ) : (
            <svg className={css.icon}>
              <use href={`${sprite}#chevron-down-icon`}></use>
            </svg>
          )}
        </button>
        {showFiltersPopover && (
          <FiltersPopover
            wrapperFiltersRef={wrapperFiltersRef}
            closeFiltersPopover={closeFiltersPopover}
          />
        )}
      </div>
    </>
  );
};

export default FiltersBtn;
