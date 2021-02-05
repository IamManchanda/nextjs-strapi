import { Fragment } from "react";
import NavbarHeader from "@/components/navbar-header";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <NavbarHeader />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
