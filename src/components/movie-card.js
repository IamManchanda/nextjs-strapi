import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import propTypes from "prop-types";

function MovieCard({ movie, year }) {
  const { NEXT_PUBLIC_API_URL } = process.env;

  if (!movie.genre) {
    movie.genre = {};
    movie.genre.slug = "uncategorised";
  }

  return (
    <CardStyled>
      {movie.poster && (
        <div className="poster">
          <Image
            src={`${NEXT_PUBLIC_API_URL}${movie.poster.url}`}
            width={movie.poster.width}
            height={movie.poster.height}
            alt={movie.poster.alternativeText || movie.poster.name}
            title={movie.poster.alternativeText || movie.poster.name}
            layout="responsive"
          />
        </div>
      )}
      <div className="body">
        <h3>
          {movie.title} - {year}
        </h3>
        <p dangerouslySetInnerHTML={{ __html: movie.description }} />
        <Link href={`/movies/${movie.genre.slug}/${movie.slug}`}>
          <a>More about this movie</a>
        </Link>
      </div>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  width: 100%;
  border: 1px solid #cccccc;
  margin-top: 50px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .body {
    padding: 20px;

    h3 {
      margin-bottom: 20px;
    }

    p {
      color: #666666;
      line-height: 1.5;
    }

    a {
      display: inline-block;
      margin: 20px 0;
    }
  }
`;

MovieCard.propTypes = {
  // movie: propTypes.oneOfType([propTypes.object, propTypes.array]),
  movie: propTypes.object.isRequired,
  year: propTypes.number,
};

MovieCard.defaultProps = {
  year: 1984,
};

export default MovieCard;
