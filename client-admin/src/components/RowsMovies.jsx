import { Link } from "react-router-dom";

export const RowsMovies = ({
  id,
  index,
  title,
  image,
  synopsis,
  year,
  genre,
  author,
  artist,
  clickButton,
  clickButton2,
}) => {
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>
          <img className="img-fluid" src={image} style={{ height: 70 }} />
        </td>
        <td>{synopsis}</td>
        <td>{genre}</td>
        <td>{author}</td>
        <td>{artist}</td>
        <td>
          <Link to={`/movies/${id}`}>
            <button className="btn btn-sm btn-dark m-1" onClick={clickButton}>
              Edit
            </button>
          </Link>
          <button className="btn btn-sm btn-danger m-1" onClick={clickButton2}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
