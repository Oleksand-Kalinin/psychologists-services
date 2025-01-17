import { useDispatch, useSelector } from "react-redux";
import css from "./LogInBtn.module.css";
import { selectModalType } from "../../redux/modals/selectors.js";
import Modal from "../Modal/Modal.jsx";
import LogInForm from "../LogInForm/LogInForm.jsx";
import { openModal } from "../../redux/modals/slice.js";
const LogInBtn = () => {
  const dispatch = useDispatch();
  const typeModal = useSelector(selectModalType);

  const showLogInModal = () => dispatch(openModal("logInModal"));

  return (
    <>
      <button type="button" className={css.logInBtn} onClick={showLogInModal}>
        Log In
      </button>

      {typeModal === "logInModal" && (
        <Modal>
          <LogInForm />
        </Modal>
      )}
    </>
  );
};

export default LogInBtn;
