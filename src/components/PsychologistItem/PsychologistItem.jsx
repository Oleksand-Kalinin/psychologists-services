import { useEffect } from "react";
import Container from "../Container/Container.jsx";
import Section from "../Section/Section.jsx";

import css from "./PsychologistItem.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectPsychologistById } from "../../redux/psychologists/selectors.js";
import { fetchPsychologistById } from "../../redux/psychologists/operations.js";

const PsychologistItem = () => {
  const id = useParams("id");
  const dispatch = useDispatch();
  const psychologist = useSelector(selectPsychologistById);

  useEffect(() => {
    dispatch(fetchPsychologistById(id));
  }, [dispatch, id]);

  return (
    <Section className={css.section}>
      <Container>PsychologistItem</Container>
    </Section>
  );
};

export default PsychologistItem;
