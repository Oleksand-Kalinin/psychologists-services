import { useForm } from "react-hook-form";
import Container from "../Container/Container.jsx";
import css from "./MakeAppointmentForm.module.css";
// import { yupResolver } from "@hookform/resolvers/yup";

const MakeAppointmentForm = ({ psychologist }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    // resolver: yupResolver(RegistrationValidationSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
            defaultValue={"+380"}
            {...register("telephoneNumber")}
          />
          <span className={css.error}>{errors.telephoneNumber?.message}</span>
        </div>

        <div className={css.wrapperInput}>
          <input
            className={css.input}
            defaultValue={"00:00"}
            {...register("time")}
          />
          <span className={css.error}>{errors.time?.message}</span>
        </div>

        <div className={css.wrapperInput}>
          <input
            className={css.input}
            placeholder="Email"
            {...register("email")}
          />
          <span className={css.error}>{errors.email?.message}</span>
        </div>

        <div className={css.wrapperInput}>
          <input
            className={css.input}
            placeholder="Comment"
            {...register("comment")}
          />
          <span className={css.error}>{errors.comment?.message}</span>
        </div>

        <button type="submit" disabled={!isValid}>
          Send
        </button>
      </form>
    </Container>
  );
};

export default MakeAppointmentForm;
