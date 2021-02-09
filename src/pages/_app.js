import { ThemeProvider } from "emotion-theming";
import GlobalStyles from "@/components/global-styles";
import NavbarHeader from "@/components/navbar-header";
import theme from "@/theme";
import getConfig from "next/config";

function MyApp({ Component, pageProps, navigation }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <NavbarHeader navigation={navigation} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

const { publicRuntimeConfig } = getConfig();

MyApp.getInitialProps = async () => {
  const res = await fetch(
    `${publicRuntimeConfig.NEXT_PUBLIC_API_URL}/navigations`,
  );
  const navigation = await res.json();
  return { navigation };
};

export default MyApp;
