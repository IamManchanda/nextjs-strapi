import { Box } from "reflexbox";
import { parseCookies } from "nookies";
import { Fragment } from "react";
import fetcher from "@/utils/fetcher";

function PayedArticles({ articles }) {
  return (
    <Fragment>
      <Box variant="container">
        <Box as="h2" my={40}>
          Payed Articles
        </Box>

        {articles.map((article) => (
          <div className="article" key={article.id}>
            <h3>{article.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: article.body }} />
          </div>
        ))}
      </Box>
    </Fragment>
  );
}

export const getServerSideProps = async (ctx) => {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const jwt = parseCookies(ctx).jwt;
  if (!jwt) {
    return {
      redirect: {
        destination: "/payed-articles/login",
        permanent: false,
      },
    };
  }

  const articles = await fetcher(`${NEXT_PUBLIC_API_URL}/payed-articles`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: {
      articles,
    },
  };
};

export default PayedArticles;
