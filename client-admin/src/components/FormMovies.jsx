import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchMovies } from "../actions/creator";
import { useState, useEffect } from "react";
import { ArtistInput } from "./ArtistInput";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

export const FormMovies = () => {
  const { id } = useParams();
  const dispatcher = useDispatch();
  const { pathname } = useLocation();
  const { dataGenre } = useSelector((state) => state.genre);
  const { selectedMovie } = useSelector((state) => state.movie);
  const { input, setArtist } = useOutletContext();

  ////////////////STATE ACTOR VALUE/////////////////////////
  const [actorValues, setActorValues] = useState([]);

  const handleActorValuesChange = (values) => {
    setActorValues(values);
    setArtist(values);
  };

  ////////////////////FETCH GENRE AND SELECTED MOVIE/////////////////////////
  useEffect(() => {
    if (pathname !== "/add") {
      (async () => {
        await dispatcher(fetchMovies(`${baseUrl}/movies/${id}`));
      })();
    }
    (async () => {
      await dispatcher(fetchGenres(`${baseUrl}/genres`));
    })();
  }, []);
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <form id="form-new-movie">
        <label className="form-label text-start">Movie Title</label>
        <input
          className="form-control mb-3"
          type="text"
          id="movie-title"
          placeholder="movie title"
          name="title"
          defaultValue={selectedMovie ? selectedMovie.title : ""}
          ref={input.title}
        />

        <label className="form-label text-start">Movie Genre</label>
        <select className="form-control mb-3" ref={input.genreId}>
          {dataGenre?.map((elem) => {
            return (
              <option
                value={elem.id}
                key={elem.id}
                selected={elem.id === selectedMovie?.genreId}
              >
                {elem.name}
              </option>
            );
          })}
        </select>

        <label className="form-label text-start">Movie Synopsis</label>
        <textarea
          className="form-control mb-3"
          style={{ resize: "none" }}
          id="movie-description"
          placeholder="movie synopsis"
          name="synopsis"
          ref={input.synopsis}
          defaultValue={selectedMovie ? selectedMovie.synopsis : ""}
        ></textarea>

        <label className="form-label text-start">Movie Poster</label>
        <input
          className="form-control mb-3"
          type="text"
          id="movie-image"
          placeholder="Image Url"
          name="imgUrl"
          defaultValue={selectedMovie ? selectedMovie.imgUrl : ""}
          ref={input.imgUrl}
        />

        <label className="form-label text-start">Movie Trailer</label>
        <input
          className="form-control mb-3"
          type="text"
          id="movie-trailer"
          placeholder="Trailer Url"
          name="trailerUrl"
          defaultValue={selectedMovie ? selectedMovie.trailerUrl : ""}
          ref={input.trailerUrl}
        />

        {pathname === "/add" ? (
          <ArtistInput onInputValuesChange={handleActorValuesChange} />
        ) : null}
      </form>
    </>
  );
};
