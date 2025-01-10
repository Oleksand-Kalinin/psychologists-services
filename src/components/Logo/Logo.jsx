import { Link } from "react-router-dom";
import css from "./Logo.module.css";
import clsx from "clsx";
const Logo = () => {
  return (
    <Link className={css.logo} to="/">
      <span className={clsx(css.acceptColorGreen, css.acceptWeight700)}>
        psychologists
      </span>
      <span className={clsx(css.acceptColorGreen, css.acceptWeight500)}>.</span>
      services
    </Link>
  );
};

export default Logo;
