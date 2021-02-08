import MovieCard from "@/components/movie-card";

function PageIndex({ movies }) {
  return (
    <div className="container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
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
