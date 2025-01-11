import { Link } from "react-router-dom";
import sprite from "../../images/sprite.svg";
import css from "./GetStartedBtn.module.css";

const GetStartedBtn = () => {
  return (
    <Link className={css.getStartedBtn} to="/psychologists">
      <span>Get started</span>
      <svg className={css.icon}>
        <use href={`${sprite}#arrow-top-right-icon`}></use>
      </svg>
    </Link>
  );
};

export default GetStartedBtn;
