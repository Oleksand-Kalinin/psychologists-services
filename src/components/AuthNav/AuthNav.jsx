import clsx from "clsx";
import LogInBtn from "../LogInBtn/LogInBtn.jsx";
import RegistrationBtn from "../RegistrationBtn/RegistrationBtn.jsx";
import css from "./AuthNav.module.css";

const AuthNav = ({ className }) => {
  return (
    <div className={clsx(className, css.authNav)}>
      <LogInBtn />
      <RegistrationBtn />
    </div>
  );
};

export default AuthNav;
