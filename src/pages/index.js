function PageIndex({ movies }) {
  console.log({ movies });
  return (
    <div className="container">
      <h1>This is our Front Page</h1>
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
