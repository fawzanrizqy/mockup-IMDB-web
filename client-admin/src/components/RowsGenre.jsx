import { Link } from "react-router-dom";


export const RowsGenre = ({ id, index, name, clickButton, clickButton2 }) => {
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>
        <Link to={`edit/${id}`}>
            <button className="btn btn-sm btn-dark m-2" onClick={clickButton}>Edit</button>
        </Link>
          <button className="btn btn-sm btn-danger m-2" onClick={clickButton2}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
