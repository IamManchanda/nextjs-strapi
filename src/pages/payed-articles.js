import { Box } from "reflexbox";
import { parseCookies, setCookie } from "nookies";
import { Fragment } from "react";
import fetcher from "@/utils/fetcher";

function PayedArticles({ articles, authData }) {
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

  const loginInfo = {
    identifier: "test@test.com",
    password: "test@password",
  };

  const login = await fetcher(`${NEXT_PUBLIC_API_URL}/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  setCookie(null, "jwt", login.jwt, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  /* const jwt = parseCookies(ctx).jwt; */
  const articles = await fetcher(`${NEXT_PUBLIC_API_URL}/payed-articles`, {
    headers: {
      Authorization: `Bearer ${login.jwt}`,
    },
  });
  return {
    props: {
      articles,
      authData: login,
    },
  };
};

export default PayedArticles;
