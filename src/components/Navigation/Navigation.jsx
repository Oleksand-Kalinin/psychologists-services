import { NavLink } from "react-router-dom";
import { buildSectionClass } from "../../utils/buildSectionClass.js";
import clsx from "clsx";

import Logo from "../Logo/Logo.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";

import css from "./Navigation.module.css";

const Navigation = ({ sectionName }) => {
  const isLoggedIn = false;

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };

  return (
    <nav className={css.navigation}>
      <Logo sectionName={sectionName} />
      <div className={buildSectionClass("wrapperLinks", sectionName, css)}>
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
      {isLoggedIn ? <p>UserMenu</p> : <AuthNav sectionName={sectionName} />}
    </nav>
  );
};

export default Navigation;
