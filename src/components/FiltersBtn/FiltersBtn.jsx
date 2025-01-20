import { useState } from "react";
import sprite from "../../images/sprite.svg";
import css from "./FiltersBtn.module.css";
import FiltersPopover from "../FiltersPopover/FiltersPopover.jsx";

const FiltersBtn = () => {
  const [optionValue, setOptionValue] = useState("Show all");
  const [showFiltersPopover, setShowFiltersPopover] = useState(false);

  //   const options = [
  //     { value: "a-to-z", label: "A to Z" },
  //     { value: "z-to-a", label: "Z to A" },
  //     { value: "less-then-ten", label: "Less then 10$" },
  //     { value: "show-all", label: "Show all" },
  //   ];

  const handleClickFiltersBtn = () => {
    setShowFiltersPopover(!showFiltersPopover);
  };

  const selectOptionFilter = (option) => {
    setOptionValue(option);
    setShowFiltersPopover(false);
  };

  return (
    <div className={css.wrapperFiltersBtn}>
      <p className={css.text}>Filters</p>
      <button
        className={css.filtersBtn}
        type="button"
        onClick={handleClickFiltersBtn}
      >
        <p>{optionValue}</p>

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
        <FiltersPopover selectOptionFilter={selectOptionFilter} />
      )}
    </div>
  );
};

export default FiltersBtn;
