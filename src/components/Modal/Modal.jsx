import ReactModal from "react-modal";
import sprite from "../../images/sprite.svg";
import "./react-modal.css";
import css from "./Modal.module.css";

function Modal({ showModal, closeModal, children }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  const handleAfterClose = () => {
    document.body.removeAttribute("class");
    document.querySelector("#root").removeAttribute("aria-hidden");
  };

  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      bodyOpenClassName={"isOpenModal"}
      onAfterClose={handleAfterClose}
    >
      <button className={css.closeBtn} type="button" onClick={closeModal}>
        <svg className={css.closeIcon}>
          <use href={`${sprite}#x-icon`}></use>
        </svg>
      </button>
      {children}
    </ReactModal>
  );
}

export default Modal;
