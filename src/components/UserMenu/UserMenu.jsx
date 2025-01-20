import { useSelector } from "react-redux";
import css from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors.js";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";
import sprite from "../../images/sprite.svg";
import { buildSectionClass } from "../../js/utils/buildSectionClass.js";

const UserMenu = ({ sectionName }) => {
  const user = useSelector(selectUser);
  return (
    <div className={buildSectionClass("wrapperUserMenu", sectionName, css)}>
      <div className={css.wrapperUserInfo}>
        <div className={css.wrapperUserIcon}>
          <svg className={css.userIcon}>
            <use href={`${sprite}#user-icon`}></use>
          </svg>
        </div>
        <p className={css.userName}>{user.name}</p>
      </div>
      <LogOutBtn />
    </div>
  );
};

export default UserMenu;
