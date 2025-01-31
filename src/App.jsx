import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";

import Layout from "./components/Layout/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { useDispatch, useSelector } from "react-redux";
import { apiRefreshUser } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const PsychologistsPage = lazy(() => import("./pages/PsychologistsPage.jsx"));

const FavoritesPage = lazy(() => import("./pages/FavoritesPage.jsx"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  if (isRefreshing)
    return (
      <>
        <p>User is refreshing, please wait</p>
        <p>Loading...</p>
      </>
    );

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />

        <Route
          path="/favorites"
          element={<PrivateRoute component={<FavoritesPage />} />}
        />

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
