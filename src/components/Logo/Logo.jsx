import { Link } from "react-router-dom";
import css from "./Logo.module.css";
import clsx from "clsx";
import ThemePopover from "../ThemePopover/ThemePopover.jsx";
const Logo = ({ sectionName }) => {
  return (
    <div className={clsx({ [css.wrapperLogo]: sectionName === "AppBar" })}>
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
        <span className={clsx(css.acceptColorGreen, css.acceptWeight500)}>
          .
        </span>
        services
      </Link>
      {sectionName === "AppBar" && (
        <ThemePopover className={css.wrapperThemePopover} />
      )}
    </div>
  );
};

export default Logo;
