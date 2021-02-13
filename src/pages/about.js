import { NextSeo } from "next-seo";
import { Fragment } from "react";
import { Box } from "reflexbox";
import fetcher from "@/utils/fetcher";

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
  const page = await fetcher(`${NEXT_PUBLIC_API_URL}/pages/1`);

  return {
    props: {
      page,
    },
    revalidate: 3,
  };
};

export default PageAbout;
