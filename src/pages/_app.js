import GlobalStyles from "@/components/global-styles";
import NavbarHeader from "@/components/navbar-header";
import theme from "@/theme";
import { ThemeProvider } from "emotion-theming";
import { DefaultSeo } from "next-seo";
import getConfig from "next/config";
import { Fragment } from "react";
import SEO from "../../next-seo.config";

function MyApp({ Component, pageProps, navigation }) {
  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NavbarHeader navigation={navigation} />
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
}

const { publicRuntimeConfig } = getConfig();

MyApp.getInitialProps = async () => {
  const { NEXT_PUBLIC_API_URL } = publicRuntimeConfig;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/navigations`);
  const navigation = await res.json();
  return { navigation };
};

export default MyApp;
