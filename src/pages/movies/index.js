import { Flex, Box } from "reflexbox";
import { useRouter } from "next/router";
import fetcher from "@/utils/fetcher";

function PageMovies({ page, movies, moviesCount }) {
  const router = useRouter();
  const lastPage = Math.ceil(moviesCount / 3);
  return (
    <Box variant="container" pt={40}>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ul>
      <Flex mt={40} pl={20} justifyContent="space-between" maxWidth={300}>
        <button
          onClick={() => router.push(`/movies?page=${page - 1}`)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => router.push(`/movies?page=${page + 1}`)}
          disabled={page >= lastPage}
        >
          Next
        </button>
      </Flex>
    </Box>
  );
}

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const start = +page === 1 ? 0 : (+page - 1) * 3;
  const moviesCount = await fetcher(`${NEXT_PUBLIC_API_URL}/movies/count`);
  const movies = await fetcher(
    `${NEXT_PUBLIC_API_URL}/movies?_limit=3&_start=${start}`,
  );

  return {
    props: {
      page: +page,
      movies,
      moviesCount,
    },
  };
};

export default PageMovies;
