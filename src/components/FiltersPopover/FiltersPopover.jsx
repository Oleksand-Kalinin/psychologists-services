import css from "./FiltersPopover.module.css";

const FiltersPopover = ({ selectOptionFilter }) => {
  const handleClick = (event) => {
    if (event.target.tagName === "BUTTON") {
      const filterOption = event.target.textContent;
      selectOptionFilter(filterOption);
    }
  };

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
