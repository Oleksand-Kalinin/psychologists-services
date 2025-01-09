import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";

function Layout({ children }) {
  return (
    <div>
      <AppBar />
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </div>
  );
}

export default Layout;
