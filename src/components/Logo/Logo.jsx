import { Link } from "react-router-dom";
import css from "./Logo.module.css";
import clsx from "clsx";
const Logo = ({ sectionName }) => {
  return (
    <Link
      className={clsx(css.logo, {
        [css.logoAppBar]: sectionName === "AppBar",
        [css.logoNavigationModal]: sectionName === "NavigationModal",
      })}
      to="/"
    >
      <span className={clsx(css.acceptColorGreen, css.acceptWeight700)}>
        psychologists
      </span>
      <span className={clsx(css.acceptColorGreen, css.acceptWeight500)}>.</span>
      services
    </Link>
  );
};

export default Logo;
