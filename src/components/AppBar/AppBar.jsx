import BurgerBtn from "../BurgerBtn/BurgerBtn.jsx";
import Container from "../Container/Container.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./AppBar.module.css";

const AppBar = () => {
  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Navigation sectionName={"AppBar"} />
        <BurgerBtn />
      </Container>
    </header>
  );
};

export default AppBar;
