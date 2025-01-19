import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";

import { LogInValidationSchema } from "../../js/validation/validationSchemas.js";

import Container from "../Container/Container.jsx";

import sprite from "../../images/sprite.svg";
import css from "./LogInForm.module.css";
import { useDispatch } from "react-redux";
import { apiLogin } from "../../redux/auth/operations.js";
import toast from "react-hot-toast";
import { closeModal } from "../../redux/modals/slice.js";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LogInValidationSchema),
    mode: "onChange",
  });

  const toggleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const changePasswordInput = () => {
    setShowEyeIcon(watch("password").trim().length > 0);
  };

  const onSubmit = (data) => {
    dispatch(apiLogin(data))
      .unwrap()
      .then(() => {
        toast.success("Successfully logged in! Let’s get started.");
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
      <h2 className={css.title}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(css.wrapperInput, css.wrapperInputEmail)}>
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
          Log In
        </button>
      </form>
    </Container>
  );
};

export default LogInForm;
