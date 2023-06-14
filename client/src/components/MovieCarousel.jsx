import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

const MovieCarousel = ({ dataMovie }) => {
  return (
    <Carousel>
      {dataMovie.map((movie) => (
        <Carousel.Item key={movie.title}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <Card
              style={{ width: "80%", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Card.Img
                  variant="top"
                  src={movie.imgUrl}
                  style={{
                    objectFit: "cover",
                    height: "20%",
                    width: "20%",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title>
                  <span
                    style={{
                      textAlign: "center",
                      color: "#e7c412",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      position: "absolute",
                      top: "88%",
                      left: "5%",
                    }}
                  >
                    {movie.title}
                  </span>
                  <span
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: "1.1rem",
                      position: "absolute",
                      top: "98%",
                      left: "5%",
                    }}
                  >
                    {movie.Genre.name}
                  </span>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
