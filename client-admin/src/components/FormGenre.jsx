import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { fetchGenres } from "../actions/creator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

export const FormGenre = () => {
  const inputGenre = useOutletContext();
  const { id } = useParams();
  const dispatcher = useDispatch();
  const { pathname } = useLocation();
  const { selectedGenre } = useSelector((state) => state.genre);

  ////////////////////FETCH GENRE AND SELECTED MOVIE/////////////////////////
  useEffect(() => {
    if (pathname !== "/add") {
      (async () => {
        await dispatcher(fetchGenres(`${baseUrl}/genres/${id}`));
      })();
    }
  }, []);
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <form id="form-new-genre">
        <label className="form-label text-start">Genre Name</label>
        <input
          className="form-control mb-3"
          type="text"
          id="genre-name"
          placeholder="genre name"
          name="name"
          ref={inputGenre.name}
          defaultValue={selectedGenre ? selectedGenre.name : ""}
        />
      </form>
    </>
  );
};
