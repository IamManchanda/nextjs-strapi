import { Flex, Box } from "reflexbox";
import MovieCard from "@/components/movie-card";

function PageIndex({ movies }) {
  return (
    <Box variant="container">
      <Box my={40} as="h2">
        Latest Movies
      </Box>
      <Flex
        justifyContent="space-between"
        flexDirection={{ _: "column", md: "row" }}
      >
        {movies.map((movie) => (
          <Box key={movie.id} width={{ _: "100%", md: "30%" }}>
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export const getServerSideProps = async () => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/movies`);
  const movies = await res.json();

  return {
    props: {
      movies,
    },
  };
};

export default PageIndex;
