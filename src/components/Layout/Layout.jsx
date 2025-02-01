import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import Loader from "../Loader/Loader.jsx";

function Layout({ children }) {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
}

export default Layout;
