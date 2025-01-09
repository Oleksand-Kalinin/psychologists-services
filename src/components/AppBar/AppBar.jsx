import Navigation from "../Navigation/Navigation.jsx";

const AppBar = () => {
  const isLoggedIn = false;

  return (
    <header>
      <Navigation />
      {isLoggedIn ? <p>UserMenu</p> : <p>AuthNav</p>}
    </header>
  );
};

export default AppBar;
