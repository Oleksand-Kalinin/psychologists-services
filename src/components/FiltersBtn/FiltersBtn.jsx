import { useRef, useState } from "react";
import sprite from "../../images/sprite.svg";
import css from "./FiltersBtn.module.css";
import FiltersPopover from "../FiltersPopover/FiltersPopover.jsx";
import { useSelector } from "react-redux";
import { selectSortBy } from "../../redux/filters/selectors.js";

const FiltersBtn = () => {
  const wrapperFiltersRef = useRef(null);
  const filterValue = useSelector(selectSortBy);
  const [showFiltersPopover, setShowFiltersPopover] = useState(false);

  const toggleShowFiltersPopover = () => {
    setShowFiltersPopover(!showFiltersPopover);
  };

  const closeFiltersPopover = () => {
    setShowFiltersPopover(false);
  };

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
