import css from "./LogOutBtn.module.css";
const LogOutBtn = () => {
  // const dispatch = useDispatch();

  const handleClickLogOut = () => {
    console.log("logOut");
  };

  return (
    <button type="button" className={css.logOutBtn} onClick={handleClickLogOut}>
      Log out
    </button>
  );
};

export default LogOutBtn;
