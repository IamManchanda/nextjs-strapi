import { Box } from "reflexbox";
import styled from "@emotion/styled";
import { Fragment, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import fetcher from "@/utils/fetcher";
import Link from "next/link";

const { NEXT_PUBLIC_API_URL } = process.env;

function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const loginInfo = {
      identifier: username,
      password: password,
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

    router.push("/payed-articles");
  }

  return (
    <Fragment>
      <LoginStyled>
        <Box variant="container">
          <Box as="h2" my={40}>
            You need to login to access this page
          </Box>

          <form>
            <input
              type="email"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <br />
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <p className="or-register">
              or,{" "}
              <Link href="/payed-articles/register">
                <a>Register</a>
              </Link>
            </p>
          </form>
        </Box>
      </LoginStyled>
    </Fragment>
  );
}

const LoginStyled = styled.div`
  input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }

  p.or-register {
    padding: 10px 0;
  }
`;

export default Login;
