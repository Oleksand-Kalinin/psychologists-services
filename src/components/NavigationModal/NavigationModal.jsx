import Container from "../Container/Container.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./NavigationModal.module.css";

const NavigationModal = () => {
  return (
    <Container className={css.container}>
      <Navigation sectionName={"NavigationModal"} />
    </Container>
  );
};

export default NavigationModal;
