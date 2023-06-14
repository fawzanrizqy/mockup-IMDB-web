import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const CoverMenu = ({ handleCloseMenu }) => {
  return (
    <>
      <div className="menu-overlay" onClick={handleCloseMenu}></div>
      <div className="menu-container">
        <button className="close-button" onClick={handleCloseMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h1 style={{ color: "#e7c412" }}>FEATURES COMING SOON</h1>
      </div>
    </>
  );
};
