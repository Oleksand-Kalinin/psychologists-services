import sprite from "../../images/sprite.svg";
import Modal from "../Modal/Modal.jsx";
import css from "./BurgerBtn.module.css";
import NavigationModal from "../NavigationModal/NavigationModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modals/slice.js";
import { selectModalType } from "../../redux/modals/selectors.js";

const BurgerBtn = () => {
  const dispatch = useDispatch();
  const typeModal = useSelector(selectModalType);

  const showNavModal = () => dispatch(openModal("navigationModal"));

  return (
    <>
      <button onClick={showNavModal} type="button" className={css.burgerBtn}>
        <svg className={css.icon}>
          <use href={`${sprite}#burger-icon`}></use>
        </svg>
      </button>
      {typeModal === "navigationModal" && (
        <Modal>
          <NavigationModal />
        </Modal>
      )}
    </>
  );
};

export default BurgerBtn;
