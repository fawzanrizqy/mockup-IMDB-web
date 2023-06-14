import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/button.css";

const CardMovie = ({ title, synopsis, id, imgUrl, trailerUrl }) => {
  return (
    <Card
      style={{ width: "14rem", height: "24rem", borderRadius: "10px" }}
      bg="black"
      text="light"
      className="me-4 mb-5 col-4 col-md-4 col-sm-6 border-0"
    >
      <div style={{ position: "relative", height: "100%" }}>
        <Card.Img
          src={imgUrl}
          alt={title}
          style={{
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: "70%",
            borderRadius: "10px 10px 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%)",
            padding: "1rem",
            color: "white",
            fontFamily: "Arial, sans-serif",
            height: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "0 0 10px 10px",
          }}
        >
          <div>
            <Card.Title
              className="text-truncate"
              style={{
                marginBottom: "0.5rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {title}
            </Card.Title>
            <Card.Text
              className="text-truncate"
              style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
            >
              {synopsis}
            </Card.Text>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            <Link to={`/details/${id}`}>
              <Button
                variant="outline-light"
                style={{ marginRight: "0.5rem" }}
                className="hover-yellow"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="m-1" />
              </Button>
            </Link>
            <Button
              variant="outline-light"
              onClick={() => window.open(trailerUrl, "_blank")}
              className="hover-yellow"
            >
              <FontAwesomeIcon icon={faPlay} className="m-1" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardMovie;
