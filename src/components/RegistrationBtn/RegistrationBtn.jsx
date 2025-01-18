import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal.jsx";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationBtn.module.css";
import { selectModalType } from "../../redux/modals/selectors.js";
import { openModal } from "../../redux/modals/slice.js";

const RegistrationBtn = () => {
  const dispatch = useDispatch();
  const typeModal = useSelector(selectModalType);

  const showRegistrationModal = () => dispatch(openModal("registrationModal"));

  return (
    <>
      <button
        type="button"
        className={css.registrationBtn}
        onClick={showRegistrationModal}
      >
        Registration
      </button>

      {typeModal === "registrationModal" && (
        <Modal>
          <RegistrationForm />
        </Modal>
      )}
    </>
  );
};

export default RegistrationBtn;
