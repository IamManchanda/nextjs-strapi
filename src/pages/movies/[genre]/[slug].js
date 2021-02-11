import { Box } from "reflexbox";

function PageMovieGenreSlug({ movie }) {
  return (
    <Box variant="container">
      <Box as="h2" my={40}>
        {movie.movie_title}
      </Box>
      <Box maxWidth={600}>
        <p dangerouslySetInnerHTML={{ __html: movie.description }}></p>
      </Box>
    </Box>
  );
}

export const getServerSideProps = async (context) => {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const { slug } = context.query;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/movies?slug=${slug}`);
  const data = await res.json();
  return {
    props: {
      movie: data[0],
    },
  };
};

export default PageMovieGenreSlug;
