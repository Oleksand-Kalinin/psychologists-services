import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Layout from "./components/Layout/Layout.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const PsychologistsPage = lazy(() => import("./pages/PsychologistsPage.jsx"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage.jsx"));

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
