import { NextSeo } from "next-seo";
import { Fragment } from "react";
import { Box } from "reflexbox";

function PageAbout({ page }) {
  const SEO = {
    title: page.title,
    description: "Just your normal about page",
    openGraph: {
      title: page.title,
      description: "Just your normal about page",
    },
  };

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <Box variant="container">
        <Box as="h2" my={40}>
          {page.title}
        </Box>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </Box>
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/pages/1`);
  const page = await res.json();

  return {
    props: {
      page,
    },
  };
};

export default PageAbout;
