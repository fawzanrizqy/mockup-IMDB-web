import { Link, useNavigate } from "react-router-dom";
import { ButtonAdd } from "../components/ButtonAdd";
import { ModalComponent } from "../components/ModalComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleModal,
  setModalTitle,
  fetchGenres,
  writeGenres,
  clearGenre,
} from "../actions/creator";
import { useEffect } from "react";
import { RowsGenre } from "../components/RowsGenre";
import Swal from "sweetalert2";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

export const GenrePage = () => {
  const { statusModal, titleModal } = useSelector((state) => state.main);
  const { dataGenre } = useSelector((state) => state.genre);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  ////////////////////FETCH MOVIES/////////////////////////
  useEffect(() => {
    (async () => {
      await dispatcher(fetchGenres(`${baseUrl}/genres`));
    })();
  }, []);
  ////////////////////////////////////////////////////////////////

  //HIDE AND SHOW MODAL//////////////////////
  const handleClose = () => {
    dispatcher(toggleModal());
    dispatcher(clearGenre());
    navigate(-1);
  };

  const handleShow = () => dispatcher(toggleModal());
  //////////////////////////////////////

  //SET MODAL TITLE////////////////
  const setModal = (title) => {
    handleShow();
    dispatcher(setModalTitle(title));
  };
  ///////////////////////////////////////

  ////////////POST/DELETE GENRE///////
  const handleSave = async (url, data, method) => {
    try {
      if (!data.name && method !== "DELETE") {
        throw "Name Must not be empty";
      }
      await dispatcher(writeGenres(url, data, method));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    } finally {
      if (data.name && method !== "DELETE") {
        method !== "DELETE" ? handleClose() : "";
      }
      await dispatcher(fetchGenres(`${baseUrl}/genres`));
    }
  };

  return (
    <>
      <section id="section-genre" className="container-fluid">
        <div>
          <h1 className="display-4 text-center">Movie Genre</h1>
          <Link to="add">
            <ButtonAdd
              title={"Add New Genre"}
              clickButton={() => setModal("Add New Genre")}
            />
          </Link>
        </div>
        <div className="container pt-5">
          <div className="table-responsive mt-3">
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {dataGenre?.map((genre, index) => {
                  return (
                    <RowsGenre
                      key={genre.id}
                      id={genre.id}
                      name={genre.name}
                      index={index}
                      clickButton={() => setModal("Edit Genre")}
                      clickButton2={() =>
                        handleSave(
                          `${baseUrl}/genres/${genre.id}`,
                          {},
                          "DELETE"
                        )
                      }
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
