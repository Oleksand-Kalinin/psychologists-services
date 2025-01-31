import { useForm } from "react-hook-form";
import Container from "../Container/Container.jsx";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import sprite from "../../images/sprite.svg";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";
import css from "./MakeAppointmentForm.module.css";
import clsx from "clsx";
import { MakeAppointmentValidationSchema } from "../../js/validation/validationSchemas.js";
import toast from "react-hot-toast";

const MakeAppointmentForm = ({ psychologist }) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0);

  const [selectedTime, setSelectedTime] = useState(startOfDay);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(MakeAppointmentValidationSchema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    toast.success(
      `Thank you, ${data.userName}! Your appointment request has been successfully sent! The psychologist will contact you soon.`
    );
  };

  useEffect(() => {
    setValue("time", selectedTime);
  }, [selectedTime, setValue]);

  return (
    <Container className={css.container}>
      <h2 className={css.title}>Make an appointment with a psychologists</h2>
      <p className={css.text}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className={css.wrapperPsychologistInfo}>
        <img
          className={css.avatar}
          src={psychologist.avatar_url}
          alt={`Photo of ${psychologist.name}`}
        />
        <p className={css.profession}>Your psychologists</p>
        <h3 className={css.name}>{psychologist.name}</h3>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.wrapperInput}>
          <input
            className={css.input}
            placeholder="Name"
            {...register("userName")}
          />
          <span className={css.error}>{errors.userName?.message}</span>
        </div>

        <div className={css.wrapperPhoneTime}>
          <div className={css.wrapperInput}>
            <input
              className={css.input}
              defaultValue={"+380"}
              {...register("phoneNumber")}
            />
            <span className={css.error}>{errors.phoneNumber?.message}</span>
          </div>

          <div
            className={clsx(
              css.wrapperInput,
              css.wrapperTime,
              "datepickerTime"
            )}
          >
            <DatePicker
              className={css.input}
              dateFormat="HH:mm"
              selected={selectedTime}
              onChange={(time) => {
                setSelectedTime(time);
                setValue("time", time);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Meeting time"
              timeFormat="HH:mm"
              minTime={new Date().setHours(8, 59)}
              maxTime={new Date().setHours(18, 0)}
            />
            <input type="hidden" {...register("time")} />

            <svg className={css.iconClock}>
              <use href={`${sprite}#clock-icon`}></use>
            </svg>
            <span className={css.error}>{errors.time?.message}</span>
          </div>
        </div>

        <div className={css.wrapperInput}>
          <input
            className={css.input}
            placeholder="Email"
            {...register("email")}
          />
          <span className={css.error}>{errors.email?.message}</span>
        </div>

        <div className={clsx(css.wrapperInput, css.wrapperTextarea)}>
          <textarea
            className={clsx(css.input, css.textarea)}
            placeholder="Comment"
            {...register("comment")}
          />
          <span className={css.error}>{errors.comment?.message}</span>
        </div>

        <button className={css.btn} type="submit" disabled={!isValid}>
          Send
        </button>
      </form>
    </Container>
  );
};

export default MakeAppointmentForm;
