import ContextWrapper from "@/components/context-wrapper";
import GlobalStyles from "@/components/global-styles";
import NavbarHeader from "@/components/navbar-header";
import theme from "@/theme";
import fetcher from "@/utils/fetcher";
import { ThemeProvider } from "emotion-theming";
import { DefaultSeo } from "next-seo";
import getConfig from "next/config";
import { Fragment } from "react";
import { appWithTranslation } from "../../i18n";
import SEO from "../../next-seo.config";

function MyApp({ Component, pageProps, navigation }) {
  return (
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
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // TODO: https://github.com/isaachinman/next-i18next-vercel

  const { publicRuntimeConfig } = getConfig();
  const { NEXT_PUBLIC_API_URL } = publicRuntimeConfig;

  let pageProps = {};
  const navigation = await fetcher(`${NEXT_PUBLIC_API_URL}/navigations`);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    navigation,
  };
};

export default appWithTranslation(MyApp);
