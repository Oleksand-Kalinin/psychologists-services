import sprite from "../../images/sprite.svg";
import css from "./BurgerBtn.module.css";

const BurgerBtn = () => {
  return (
    <button type="button" className={css.burgerBtn}>
      <svg className={css.icon}>
        <use href={`${sprite}#nav-menu-icon`}></use>
      </svg>
    </button>
  );
};

export default BurgerBtn;
