import { NavLink } from "react-router-dom";
import { buildSectionClass } from "../../js/utils/buildSectionClass.js";
import clsx from "clsx";

import Logo from "../Logo/Logo.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";

import css from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import UserMenu from "../UserMenu/UserMenu.jsx";
import { closeModal } from "../../redux/modals/slice.js";

const Navigation = ({ sectionName }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };

  const handleClickLink = () => {
    if (sectionName === "NavigationModal") {
      dispatch(closeModal());
    }
  };

  return (
    <nav className={css.navigation}>
      <Logo sectionName={sectionName} />
      <div className={buildSectionClass("wrapperLinks", sectionName, css)}>
        <NavLink className={buildLinkClass} to="/" onClick={handleClickLink}>
          Home
        </NavLink>
        <NavLink
          className={buildLinkClass}
          to="/psychologists"
          onClick={handleClickLink}
        >
          Psychologists
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className={buildLinkClass}
            to="/favorites"
            onClick={handleClickLink}
          >
            Favorites
          </NavLink>
        )}
      </div>
      {isLoggedIn ? (
        <UserMenu sectionName={sectionName} />
      ) : (
        <AuthNav sectionName={sectionName} />
      )}
    </nav>
  );
};

export default Navigation;
