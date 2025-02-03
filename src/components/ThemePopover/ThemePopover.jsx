import clsx from "clsx";
import css from "./ThemePopover.module.css";
import { useTheme } from "../ThemeProvider/ThemeProvider.jsx";

const ThemePopover = ({ className }) => {
  const { changeTheme } = useTheme();
  const handleClickBtnColorGreen = () => {
    changeTheme("green");
  };
  const handleClickBtnColorBlue = () => {
    changeTheme("blue");
  };

  const handleClickBtnColorOrange = () => {
    changeTheme("orange");
  };

  return (
    <div className={clsx(css.wrapper, className)}>
      <button
        type="button"
        className={clsx(css.btnColor, css.colorGreen)}
        onClick={handleClickBtnColorGreen}
      ></button>
      <button
        type="button"
        className={clsx(css.btnColor, css.colorBlue)}
        onClick={handleClickBtnColorBlue}
      ></button>
      <button
        type="button"
        className={clsx(css.btnColor, css.colorOrange)}
        onClick={handleClickBtnColorOrange}
      ></button>
    </div>
  );
};

export default ThemePopover;
