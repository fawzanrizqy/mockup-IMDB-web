import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const ButtonAdd = ({ title, clickButton }) => {
  return (
    <>
      <button
        className="btn btn-dark btn-lg float-end"
        id="btn-new-movie"
        type="button"
        onClick={clickButton}
      >
        <FontAwesomeIcon icon={faPlus} />
        &nbsp;{title}
      </button>
    </>
  );
};
