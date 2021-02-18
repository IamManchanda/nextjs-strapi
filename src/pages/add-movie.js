import { Box } from "reflexbox";
import styled from "@emotion/styled";
import { parseCookies } from "nookies";
import fetcher from "@/utils/fetcher";
import { useState } from "react";

function PageAddMovie() {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const [movieTitle, setMovieTitle] = useState("");
  const [movieSlug, setMovieSlug] = useState("");

  function handleMovieTitle(event) {
    return setMovieTitle(event.target.value);
  }

  function handleMovieSlug(event) {
    return setMovieSlug(event.target.value);
  }

  async function addMovie() {
    const jwt = parseCookies().jwt;
    const movieInfo = {
      title: movieTitle,
      slug: movieSlug,
    };
    const addedMovieData = await fetcher(`${NEXT_PUBLIC_API_URL}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieInfo),
    });
    console.log({ addedMovieData });
  }

  return (
    <AddMovieStyled>
      <Box variant="container">
        <Box as="h2" my={40}>
          Add Movie
        </Box>

        <form>
          <input
            type="text"
            onChange={handleMovieTitle}
            value={movieTitle}
            placeholder="Movie title"
          />
          <br />
          <input
            type="text"
            onChange={handleMovieSlug}
            value={movieSlug}
            placeholder="Movie slug"
          />
          <br />
          <button type="button" onClick={addMovie}>
            Add Movie
          </button>
        </form>
      </Box>
    </AddMovieStyled>
  );
}

const AddMovieStyled = styled.div`
  input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
`;

export default PageAddMovie;
