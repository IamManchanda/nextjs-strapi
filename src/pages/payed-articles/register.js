import { Box } from "reflexbox";
import styled from "@emotion/styled";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import fetcher from "@/utils/fetcher";
import Link from "next/link";

const { NEXT_PUBLIC_API_URL } = process.env;

function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const registerInfo = {
      username: username,
      email: email,
      password: password,
    };

    await fetcher(`${NEXT_PUBLIC_API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    });
    router.push("/payed-articles/login");
  }

  return (
    <Fragment>
      <RegisterStyled>
        <Box variant="container">
          <Box as="h2" my={40}>
            Register here...
          </Box>

          <form>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
            />
            <br />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
            <br />
            <button type="button" onClick={handleRegister}>
              Register
            </button>
            <p className="or-login">
              or,{" "}
              <Link href="/payed-articles/login">
                <a>Login</a>
              </Link>
            </p>
          </form>
        </Box>
      </RegisterStyled>
    </Fragment>
  );
}

const RegisterStyled = styled.div`
  input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }

  p.or-login {
    padding: 10px 0;
  }
`;

export default Register;
