function PageIndex({ movies }) {
  console.log({ movies });
  return (
    <div className="container">
      {movies.map(({ title }, idx) => (
        <div key={idx}>{title}</div>
      ))}
    </div>
  );
}

export const getServerSideProps = async () => {
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/movies`);
  const movies = await res.json();

  return {
    props: {
      movies,
    },
  };
};

export default PageIndex;
