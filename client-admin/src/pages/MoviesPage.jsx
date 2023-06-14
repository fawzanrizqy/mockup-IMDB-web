import "bootstrap/dist/css/bootstrap.min.css";
import { ButtonAdd } from "../components/ButtonAdd";
import { RowsMovies } from "../components/RowsMovies";
import { ModalComponent } from "../components/ModalComponent";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../assets/css/main.css";
import Swal from "sweetalert2";
import {
  toggleModal,
  setModalTitle,
  fetchMovies,
  writeMovies,
  clearMovies,
} from "../actions/creator";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

export const MoviesPage = () => {
  const { statusModal, titleModal } = useSelector((state) => state.main);
  const { dataMovie, errMessage, isLoading } = useSelector(
    (state) => state.movie
  );
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [flag, setFlag] = useState(0);

  ////////////////////FETCH MOVIES/////////////////////////
  useEffect(() => {
    (async () => {
      await dispatcher(fetchMovies(`${baseUrl}/movies`));
    })();
  }, []);
  ////////////////////////////////////////////////////////////////

  //HIDE AND SHOW MODAL//////////////////////
  const handleClose = () => {
    dispatcher(clearMovies());
    dispatcher(toggleModal());
    setFlag(0);
    navigate(-1);
    // alert(errMessage);
  };

  const handleShow = () => {
    dispatcher(toggleModal());
    setFlag(flag + 1);
  };
  //////////////////////////////////////

  //SET MODAL TITLE////////////////
  const setModal = (title) => {
    handleShow();
    dispatcher(setModalTitle(title));
  };
  ///////////////////////////////////////

  ////////////POST/EDIT/DELETE MOVIES///////
  const handleSave = async (url, data, method) => {
    try {
      await dispatcher(writeMovies(url, data, method));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  useEffect(() => {
    if (errMessage !== "" && flag !== 0) {
      // alert("masuk atas");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${errMessage}`,
      });
    } else if (errMessage === "" && flag !== 0) {
      dispatcher(toggleModal());
      dispatcher(clearMovies());
      setFlag(0);
      // alert("masuk bawah");
    }
  }, [errMessage, dataMovie]);

  return (
    <>
      <section id="section-movie" className="container-fluid">
        <div>
          <h1 className="display-4 text-center">Movies</h1>
          <Link to="add">
            <ButtonAdd
              title={"Add New Movie"}
              clickButton={() => setModal("Add New Movie")}
            />
          </Link>
        </div>
        <div className="container pt-5">
          <div className="table-responsive mt-3">
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th>#</th>
                  <th>Movie Title</th>
                  <th>Image</th>
                  <th>Synopsis</th>
                  <th>Genre</th>
                  <th>Author</th>
                  <th className="col-md-2">Artist</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataMovie?.map((movie, index) => {
                  return (
                    <RowsMovies
                      index={index}
                      title={movie.title}
                      image={movie.imgUrl}
                      synopsis={movie.synopsis}
                      genre={movie.Genre.name}
                      author={movie.User.username}
                      artist={movie.Casts.map((cast) => {
                        return cast.name;
                      }).join(", ")}
                      id={movie.id}
                      clickButton={() => setModal("Edit Movie")}
                      clickButton2={() =>
                        handleSave(
                          `${baseUrl}/movies/${movie.id}`,
                          {},
                          "DELETE"
                        )
                      }
                      key={movie.id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ModalComponent
          title={titleModal}
          show={statusModal}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </section>
    </>
  );
};
