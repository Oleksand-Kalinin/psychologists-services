import Container from "../Container/Container.jsx";
import FiltersBtn from "../FiltersBtn/FiltersBtn.jsx";
import Section from "../Section/Section.jsx";

import css from "./PsychologistsSection.module.css";
import PsychologistsList from "../PsychologistsList/PsychologistsList.jsx";

const PsychologistsSection = () => {
  return (
    <Section className={css.psychologistsSection}>
      <Container>
        <h2 className="visually-hidden">Psychologists</h2>
        <FiltersBtn />
        <PsychologistsList />
      </Container>
    </Section>
  );
};

export default PsychologistsSection;
