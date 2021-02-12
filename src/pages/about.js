import { NextSeo } from "next-seo";
import { Fragment } from "react";

function PageAbout() {
  const SEO = {
    title: "About page",
    description: "Just your normal about page",
    openGraph: {
      title: "About page",
      description: "Just your normal about page",
    },
  };

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <h1>I'm an about page</h1>
    </Fragment>
  );
}

export default PageAbout;
