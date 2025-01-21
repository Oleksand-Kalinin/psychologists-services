import { useEffect } from "react";
import css from "./FiltersPopover.module.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice.js";

const FiltersPopover = ({ closeFiltersPopover, wrapperFiltersRef }) => {
  const dispatch = useDispatch();

  const handleClick = (event) => {
    if (event.target.tagName === "BUTTON") {
      const filterOption = event.target.textContent;
      dispatch(changeFilter(filterOption));
      closeFiltersPopover();
    }
  };

  useEffect(() => {
    const handleClickDown = (event) => {
      if (event.code === "Escape") {
        closeFiltersPopover();
      }
    };

    const handleClickBackDrop = (event) => {
      if (
        wrapperFiltersRef.current &&
        !wrapperFiltersRef.current.contains(event.target)
      ) {
        closeFiltersPopover();
      }
    };

    window.addEventListener("keydown", handleClickDown);

    window.addEventListener("mousedown", handleClickBackDrop);

    return () => {
      window.removeEventListener("keydown", handleClickDown);
      window.removeEventListener("mousedown", handleClickBackDrop);
    };
  }, []);

  return (
    <div className={css.wrapperFiltersPopover} onClick={handleClick}>
      <button className={css.button} type="button">
        A to Z
      </button>
      <button className={css.button} type="button">
        Z to A
      </button>
      <button className={css.button} type="button">
        Less than 10$
      </button>
      <button className={css.button} type="button">
        Greater than 10$
      </button>
      <button className={css.button} type="button">
        Popular
      </button>
      <button className={css.button} type="button">
        Not popular
      </button>
      <button className={css.button} type="button">
        Show all
      </button>
    </div>
  );
};

export default FiltersPopover;
