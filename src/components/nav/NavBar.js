import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const localKandyUser = localStorage.getItem("kandy_user");
  const kandyUserObject = JSON.parse(localKandyUser);

  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/locations">
          Store Locations
        </Link>
      </li>
      {kandyUserObject.staff ? (
        <>
          <li className="navbar__item active">
            <Link className="navbar__link" to="/products">
              Products
            </Link>
          </li>
        </>
      ) : (
        <></>
      )}

      {localStorage.getItem("kandy_user") ? (
        <li className="navbar__item navbar__logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("kandy_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
