import { ThemeProvider } from "@emotion/react";
import NavbarHeader from "@/components/navbar-header";
import "@/assets/styles/scss/globals.scss";

const theme = {
  colors: {
    primary: "#ff0000",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHeader />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
