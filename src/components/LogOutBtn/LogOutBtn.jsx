import { useDispatch } from "react-redux";
import { apiLogout } from "../../redux/auth/operations";
import css from "./LogOutBtn.module.css";
import { clearFavorites } from "../../redux/psychologists/slice.js";

const LogOutBtn = () => {
  const dispatch = useDispatch();

  const handleClickLogOut = () => {
    dispatch(clearFavorites());
    dispatch(apiLogout());
  };

  return (
    <button type="button" className={css.logOutBtn} onClick={handleClickLogOut}>
      Log out
    </button>
  );
};

export default LogOutBtn;
