import { useDispatch, useSelector } from "react-redux";
import CardMovie from "../components/CardMovie";
import { useEffect } from "react";
import { clearMovies, fetchMovies } from "../actions/creator";
import MovieCarousel from "../components/MovieCarousel";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

export const MoviesPage = () => {
  const { dataMovie } = useSelector((state) => state.movie);
  const dispatcher = useDispatch();

  useEffect(() => {
    (async () => {
      dispatcher(clearMovies());
      await dispatcher(fetchMovies(`${baseUrl}/pub/movies`));
    })();
  }, []);

  return (
    <>
      <h3 className="me-2">
        <b style={{ color: "#e7c412" }}>|</b> Highlighted Movies
      </h3>
      <MovieCarousel dataMovie={dataMovie} />
      <div className="my-4">
        <div className="d-flex align-items-center mb-3">
          <h3 className="me-2">
            <b style={{ color: "#e7c412" }}>|</b> Fan Favourite
          </h3>
        </div>
        <div className="row justify-content-center">
          {dataMovie?.map((movie) => (
            <CardMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              synopsis={movie.synopsis}
              imgUrl={movie.imgUrl}
              trailerUrl={movie.trailerUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};
