import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../Container/Container.jsx";

import sprite from "../../images/sprite.svg";
import css from "./LogInForm.module.css";
import clsx from "clsx";
import { LogInValidationSchema } from "../../utils/validationSchemas.js";

const LogInForm = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LogInValidationSchema),
    mode: "onBlur",
  });

  const toggleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const changePasswordInput = () => {
    setShowEyeIcon(watch("password").trim().length > 0);
  };

  const onSubmit = (data) => {
    console.log(data);
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
          <button
            className={css.buttonEye}
            type="button"
            onClick={toggleVisiblePassword}
          >
            {showEyeIcon && !isVisiblePassword && (
              <svg className={css.eyeIcon}>
                <use href={`${sprite}#eye-icon`}></use>
              </svg>
            )}
            {showEyeIcon && isVisiblePassword && (
              <svg className={css.eyeIcon}>
                <use href={`${sprite}#eye-off-icon`}></use>
              </svg>
            )}
          </button>
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
