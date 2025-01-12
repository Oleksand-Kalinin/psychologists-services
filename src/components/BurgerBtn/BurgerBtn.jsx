import { useState } from "react";
import sprite from "../../images/sprite.svg";
import Modal from "../Modal/Modal.jsx";
import css from "./BurgerBtn.module.css";

const BurgerBtn = () => {
  const [showModal, setShowModal] = useState(false);

  const showNavModal = () => setShowModal(true);
  const closeNavModal = () => setShowModal(false);

  return (
    <>
      <button onClick={showNavModal} type="button" className={css.burgerBtn}>
        <svg className={css.icon}>
          <use href={`${sprite}#burger-icon`}></use>
        </svg>
      </button>
      <Modal showModal={showModal} closeModal={closeNavModal}>
        <p>Modal navigation</p>
      </Modal>
    </>
  );
};

export default BurgerBtn;
