import { Outlet, useParams } from "react-router-dom";
import "../assets/css/modal.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import "../assets/css/main.css";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

export const ModalComponent = ({ title, show, handleClose, handleSave }) => {
  let { id } = useParams();

  //tembak dulu user id nya karena belum pake real token
  let input = {
    title: useRef(),
    synopsis: useRef(),
    trailerUrl: useRef(),
    imgUrl: useRef(),
    genreId: useRef(),
    authorId: localStorage.getItem("id"),
  };

  const [artist, setArtist] = useState([]);

  let inputGenre = {
    name: useRef(),
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modal-body modal-container"
          style={{ overflowY: "auto", maxHeight: "20rem" }}
        >
          <Outlet
            context={
              title === "Add New Genre" || title === "Edit Genre"
                ? inputGenre
                : { input, setArtist }
            }
          />
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={
              title === "Edit Genre"
                ? () =>
                    handleSave(
                      `${baseUrl}/genres/${id}`,
                      {
                        name: inputGenre.name.current.value,
                      },
                      "PATCH"
                    )
                : title === "Add New Genre"
                ? () =>
                    handleSave(
                      `${baseUrl}/genres`,
                      {
                        name: inputGenre.name.current.value,
                      },
                      "POST"
                    )
                : title === "Add New Movie"
                ? () =>
                    handleSave(
                      `${baseUrl}/movies`,
                      {
                        title: input.title.current.value,
                        synopsis: input.synopsis.current.value,
                        trailerUrl: input.trailerUrl.current.value,
                        imgUrl: input.imgUrl.current.value,
                        genreId: input.genreId.current.value,
                        authorId: input.authorId,
                        rating: 1,
                        artist,
                      },
                      "POST"
                    )
                : () =>
                    handleSave(
                      `${baseUrl}/movies/${id}`,
                      {
                        title: input.title.current.value,
                        synopsis: input.synopsis.current.value,
                        trailerUrl: input.trailerUrl.current.value,
                        imgUrl: input.imgUrl.current.value,
                        genreId: input.genreId.current.value,
                      },
                      "PATCH"
                    )
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
