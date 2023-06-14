import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovies } from "../actions/creator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

export const DetailPage = () => {
  const { id } = useParams();
  const dispatcher = useDispatch();
  const { selectedMovie } = useSelector((state) => state.movie);

  useEffect(() => {
    (async () => {
      await dispatcher(fetchMovies(`${baseUrl}/pub/movies/${id}`));
    })();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div id="leftbox" className="col-md-4 col-lg-3 mb-5 mb-lg-0">
          <div className="card border-0 shadow mb-2">
            <img
              src={selectedMovie?.imgUrl}
              alt="Movie Poster"
              className="img-fluid"
            />
            <div
              className="card-body p-2 p-xl-3  border-0"
              style={{ background: "#0c0c0c", fontFamily: "Arial, sans-serif" }}
            >
              <div className="mb-4">
                <h4 className="h4 mb-2" style={{ color: "white" }}>
                  {selectedMovie?.title}
                </h4>
                <span
                  className="text-light d-block"
                  style={{ fontSize: "0.8em" }}
                >
                  {selectedMovie?.Genre.name}
                </span>
              </div>
              <ul className="list-unstyled mb-4">
                <li className="mb-3">
                  <span className="rating">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="yellow-star "
                      style={{ color: "#e7c412", marginRight: "5px" }}
                    />
                    <span style={{ color: "white" }}>
                      {selectedMovie?.rating}/10
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-9" style={{ fontFamily: "Arial, sans-serif" }}>
          <div className="ps-lg-5">
            <div className="mb-4">
              <div className="text-start mb-3">
                <h3 className="me-2">
                  <b style={{ color: "#e7c412" }}>|</b> Synopsis
                </h3>
              </div>
              <div>
                <p className="synopsis-text">{selectedMovie?.synopsis}</p>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-start mb-3">
                <h3 className="me-2">
                  <b style={{ color: "#e7c412" }}>|</b> Casts
                </h3>
              </div>

              <div className="row mt-n4">
                {selectedMovie?.Casts?.length === 0 ? (
                  <p>No casts listed</p>
                ) : (
                  selectedMovie?.Casts?.map((actor) => {
                    return (
                      <div className="col-sm-6 col-xl-4 mt-1" key={actor.id}>
                        <div className="card text-center border-0 rounded-3">
                          <div
                            className="card-body"
                            style={{ background: "black" }}
                          >
                            {actor.profilePict !== "" ? (
                              <img
                                style={{ height: "70px", borderRadius: "10%" }}
                                src={actor.profilePict}
                                alt={actor.name}
                                className="mb-4"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faUser}
                                className="fa-3x mb-4 "
                                style={{ height: "70px", borderRadius: "10%" }}
                              />
                            )}

                            <h3 className="h5 mb-3">{actor.name}</h3>
                            <p className="mb-0">{actor.role}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-start mb-3">
                <h3 className="me-2">
                  <b style={{ color: "#e7c412" }}>|</b> Trailer
                </h3>
                {/* {selectedMovie?.trailerUrl.split("?v=")[1]} */}
              </div>
              <div className="embed-responsive embed-responsive-16by9">
                {selectedMovie?.trailerUrl ? (
                  <iframe
                    className="embed-responsive-item"
                    height={300}
                    width={400}
                    src={`https://www.youtube.com/embed/${
                      selectedMovie?.trailerUrl.split("?v=")[1].split("&")[0]
                    }`}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>No trailer available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
