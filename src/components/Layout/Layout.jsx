import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";

function Layout({ children }) {
  return (
    <>
      <AppBar />
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </>
  );
}

export default Layout;
