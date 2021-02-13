import GlobalStyles from "@/components/global-styles";
import NavbarHeader from "@/components/navbar-header";
import theme from "@/theme";
import { ThemeProvider } from "emotion-theming";
import { DefaultSeo } from "next-seo";
import getConfig from "next/config";
import { Fragment } from "react";
import useSWR from "swr";
import SEO from "../../next-seo.config";
import ContextWrapper from "@/components/context-wrapper";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_API_URL } = publicRuntimeConfig;

const fetcher = (url) => fetch(url).then((r) => r.json());

function MyApp({ Component, pageProps }) {
  const MyAppMarkup = () => (
    <Fragment>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ContextWrapper navigation={navigation}>
          <NavbarHeader />
        </ContextWrapper>
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );

  const { data, error } = useSWR(`${NEXT_PUBLIC_API_URL}/navigations`, fetcher);
  let navigation;
  if (error || !data) {
    navigation = [];
    return <MyAppMarkup />;
  }
  navigation = data;
  return <MyAppMarkup />;
}

export default MyApp;
