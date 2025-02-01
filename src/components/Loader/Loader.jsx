import { Bars } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = ({ text }) => {
  return (
    <div className={css.backdrop}>
      <div className={css.loader}>
        <p className={css.text}>{text}</p>
        <Bars
          height="80"
          width="80"
          color="var(--main-color)"
          ariaLabel="bars-loading"
          //   wrapperClass={css.loader}
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
