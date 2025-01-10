import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const isLoggedIn = false;

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
      {isLoggedIn ? <p>UserMenu</p> : <AuthNav />}
    </nav>
  );
};

export default Navigation;
