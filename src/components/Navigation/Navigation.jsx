import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <Logo />
      <div className={css.wrapperLinks}>
        <NavLink className={css.link} to="/">
          Home
        </NavLink>
        <NavLink className={css.link} to="/psychologists">
          Psychologists
        </NavLink>
        <NavLink className={css.link} to="/reviews">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
