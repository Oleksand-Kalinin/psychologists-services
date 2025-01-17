import ReactModal from "react-modal";
import sprite from "../../images/sprite.svg";
import "./react-modal.css";
import css from "./Modal.module.css";
import {
  selectModalIsOpen,
  selectModalType,
} from "../../redux/modals/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modals/slice.js";
import clsx from "clsx";

function Modal({ children }) {
  const dispatch = useDispatch();
  const showModal = useSelector(selectModalIsOpen);
  const typeModal = useSelector(selectModalType);

  const modalNavigationStyleContent = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "375px",
    inset: "0",
    padding: "0",
    backgroundColor: "var(--background-color-home)",
  };

  const defaultStyleContent = {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
  };

  const customStyles = {
    content:
      typeModal === "navigationModal"
        ? modalNavigationStyleContent
        : defaultStyleContent,
    overlay: {
      backgroundColor: "rgba(25, 26, 21, 0.6)",
    },
  };

  const handleAfterClose = () => {
    document.body.removeAttribute("class");
    document.querySelector("#root").removeAttribute("aria-hidden");
  };

  const handleCloseModal = () => dispatch(closeModal());

  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      bodyOpenClassName={"isOpenModal"}
      onAfterClose={handleAfterClose}
    >
      <button
        className={clsx(css.closeBtn, {
          [css.closeBtnNavModal]: typeModal === "navigationModal",
        })}
        type="button"
        onClick={handleCloseModal}
      >
        <svg className={css.closeIcon}>
          <use href={`${sprite}#x-icon`}></use>
        </svg>
      </button>
      {children}
    </ReactModal>
  );
}

export default Modal;
