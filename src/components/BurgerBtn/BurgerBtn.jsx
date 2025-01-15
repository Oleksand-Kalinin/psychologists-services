import { useState } from "react";
import sprite from "../../images/sprite.svg";
import Modal from "../Modal/Modal.jsx";
import css from "./BurgerBtn.module.css";
import NavigationModal from "../NavigationModal/NavigationModal.jsx";

const BurgerBtn = () => {
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);

  const showNavModal = () => {
    setShowModal(true);
    setTypeModal("navigationModal");
  };
  const closeNavModal = () => {
    setShowModal(false);
    setTypeModal(null);
  };

  return (
    <>
      <button onClick={showNavModal} type="button" className={css.burgerBtn}>
        <svg className={css.icon}>
          <use href={`${sprite}#burger-icon`}></use>
        </svg>
      </button>
      {typeModal === "navigationModal" && (
        <Modal showModal={showModal} closeModal={closeNavModal}>
          <NavigationModal />
        </Modal>
      )}
    </>
  );
};

export default BurgerBtn;
