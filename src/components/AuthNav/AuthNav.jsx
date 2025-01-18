import clsx from "clsx";
import LogInBtn from "../LogInBtn/LogInBtn.jsx";
import RegistrationBtn from "../RegistrationBtn/RegistrationBtn.jsx";
import css from "./AuthNav.module.css";
import { buildSectionClass } from "../../js/utils/buildSectionClass.js";

const AuthNav = ({ className, sectionName }) => {
  return (
    <div
      className={clsx(
        className,
        buildSectionClass("authNav", sectionName, css)
      )}
    >
      <LogInBtn />
      <RegistrationBtn />
    </div>
  );
};

export default AuthNav;
