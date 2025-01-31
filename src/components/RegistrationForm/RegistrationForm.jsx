import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import { RegistrationValidationSchema } from "../../js/validation/validationSchemas.js";
import { apiRegister } from "../../redux/auth/operations.js";

import Container from "../Container/Container.jsx";

import sprite from "../../images/sprite.svg";
import css from "./RegistrationForm.module.css";
import { closeModal } from "../../redux/modals/slice.js";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(RegistrationValidationSchema),
    mode: "onChange",
  });

  const toggleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const changePasswordInput = () => {
    setShowEyeIcon(watch("password").trim().length > 0);
  };

  const onSubmit = (data) => {
    dispatch(apiRegister(data))
      .unwrap()
      .then(() => {
        toast.success(
          "Welcome! Your registration was successful, and you are now logged in."
        );
        navigate("/psychologists");
        dispatch(closeModal());
      })
      .catch((error) => {
        if (error === "auth/email-already-in-use") {
          toast.error(
            "The email address is already in use by another account."
          );
        } else {
          toast.error("Registration failed. Please try again.");
        }
      });
  };

  return (
    <Container className={css.container}>
      <h2 className={css.title}>Registration</h2>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.wrapperInput}>
          <input
            className={css.input}
            placeholder="Name"
            {...register("userName")}
          />
          <span className={css.error}>{errors.userName?.message}</span>
        </div>

        <div className={css.wrapperInput}>
          <input
            className={css.input}
            placeholder="Email"
            {...register("email")}
          />
          <span className={css.error}>{errors.email?.message}</span>
        </div>

        <div className={clsx(css.wrapperInput, css.wrapperInputPassword)}>
          <input
            className={clsx(css.input, css.inputPassword)}
            type={isVisiblePassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { onChange: changePasswordInput })}
          />
          {showEyeIcon && (
            <button
              className={css.buttonEye}
              type="button"
              onClick={toggleVisiblePassword}
            >
              {!isVisiblePassword && (
                <svg className={css.eyeIcon}>
                  <use href={`${sprite}#eye-icon`}></use>
                </svg>
              )}
              {isVisiblePassword && (
                <svg className={css.eyeIcon}>
                  <use href={`${sprite}#eye-off-icon`}></use>
                </svg>
              )}
            </button>
          )}
          <span className={css.error}>{errors.password?.message}</span>
        </div>

        <button className={css.button} type="submit" disabled={!isValid}>
          Sign Up
        </button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
