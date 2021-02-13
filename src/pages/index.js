import { Flex, Box } from "reflexbox";
import MovieCard from "@/components/movie-card";
import fetcher from "@/utils/fetcher";

function PageIndex({ movies }) {
  return (
    <Box variant="container">
      <Box my={40} as="h2">
        Latest Movies
      </Box>
      <Flex
        justifyContent="space-between"
        flexDirection={{ _: "column", md: "row" }}
        mb={100}
        flexWrap="wrap"
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

export const getStaticProps = async () => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const movies = await fetcher(`${NEXT_PUBLIC_API_URL}/movies`);

  return {
    props: {
      movies,
    },
    revalidate: 3,
  };
};

export default PageIndex;
