import Container from "../Container/Container.jsx";
import FiltersBtn from "../FiltersBtn/FiltersBtn.jsx";
import Section from "../Section/Section.jsx";

import css from "./PsychologistsSection.module.css";

const PsychologistsSection = () => {
  return (
    <Section className={css.psychologistsSection}>
      <Container>
        <FiltersBtn />
      </Container>
    </Section>
  );
};

export default PsychologistsSection;
