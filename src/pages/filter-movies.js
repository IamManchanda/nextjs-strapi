import { Flex, Box } from "reflexbox";
import Select from "react-select";
import { useQuery } from "react-query";
import { Fragment, useState } from "react";
import fetcher from "@/utils/fetcher";

const { NEXT_PUBLIC_API_URL } = process.env;

const getMovies = async (key) => {
  const genreId = key.queryKey[1].genre;
  const actorsIds = key.queryKey[2].actors.map((id) => `actors.id=${id}`);
  const actorsQueryString = actorsIds.join("&");
  let data;

  if (genreId && actorsQueryString) {
    data = await fetcher(
      `${NEXT_PUBLIC_API_URL}/movies?genre.id=${genreId}&${actorsQueryString}`,
    );
  } else if (genreId) {
    data = await fetcher(`${NEXT_PUBLIC_API_URL}/movies?genre.id=${genreId}`);
  } else if (actorsQueryString) {
    data = await fetcher(`${NEXT_PUBLIC_API_URL}/movies?${actorsQueryString}`);
  } else {
    data = await fetcher(`${NEXT_PUBLIC_API_URL}/movies`);
  }

  return data;
};

const PageFilterMovies = ({ movies, actors, genres }) => {
  const [genreId, setGenreId] = useState(null);
  const [actorsIds, setActors] = useState([]);
  const { data, status } = useQuery(
    [
      "movies",
      {
        genre: genreId,
      },
      {
        actors: actorsIds,
      },
    ],
    getMovies,
    {
      initialData: movies,
    },
  );

  return (
    <Fragment>
      <Box variant="container">
        <Box as="h2" my={40}>
          Filter movies
        </Box>

        <Flex mb={100}>
          <Box width={200} mr={20}>
            <Select
              getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
              }
              getOptionValue={(option) => option.id}
              options={actors}
              instanceId="actors"
              isMulti
              placeholder="Filter by Actors"
              onChange={(values) => setActors(values.map((actor) => actor.id))}
            />
            <br />
            <Select
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => option.id}
              options={genres}
              instanceId="genres"
              placeholder="Filter by Genres"
              isClearable
              onChange={(value) => setGenreId(value ? value.id : null)}
            />
          </Box>
          <Box>
            {status === "loading" && <div>Loading your movies...</div>}
            {status === "error" && <div>Something went wrong</div>}

            {status === "success" &&
              data.map((movie) => (
                <Box key={movie.id} p={10}>
                  <strong>{movie.title}</strong> -&nbsp;
                  {movie.genre ? movie.genre.title : null}
                  <br />
                  {movie.actors.length > 0 &&
                    movie.actors.map((actor) => (
                      <small key={actor.id}>
                        {actor.first_name} {actor.last_name} &nbsp;
                      </small>
                    ))}
                </Box>
              ))}
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};

export async function getServerSideProps() {
  const { NEXT_PUBLIC_API_URL } = process.env;

  const moviesData = await fetcher(`${NEXT_PUBLIC_API_URL}/movies`);
  const actorsData = await fetcher(`${NEXT_PUBLIC_API_URL}/actors`);
  const genresData = await fetcher(`${NEXT_PUBLIC_API_URL}/genres`);

  return {
    props: {
      movies: moviesData,
      actors: actorsData,
      genres: genresData,
    },
  };
}

export default PageFilterMovies;
