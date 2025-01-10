import AuthNav from "../AuthNav/AuthNav.jsx";
import Container from "../Container/Container.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./AppBar.module.css";

const AppBar = () => {
  const isLoggedIn = false;

  return (
    <header>
      <Container className={css.container}>
        <Navigation />
        {isLoggedIn ? <p>UserMenu</p> : <AuthNav />}
      </Container>
    </header>
  );
};

export default AppBar;
