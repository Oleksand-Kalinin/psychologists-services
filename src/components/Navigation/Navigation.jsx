import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };
  return (
    <nav className={css.navigation}>
      <Logo />
      <div className={css.wrapperLinks}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/psychologists">
          Psychologists
        </NavLink>
        <NavLink className={buildLinkClass} to="/favorites">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
