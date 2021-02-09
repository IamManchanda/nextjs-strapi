import { ThemeProvider } from "emotion-theming";
import GlobalStyles from "@/components/global-styles";
import NavbarHeader from "@/components/navbar-header";
import theme from "@/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <NavbarHeader />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
