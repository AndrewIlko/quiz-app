import { Link } from "react-router-dom";

const PopUpItem = ({ title, togglePopUp, url }) => {
  return (
    <>
      <Link to={"/profile"}>
        <li className="header-profile__menu-item" onClick={togglePopUp}>
          {title}
        </li>
      </Link>
    </>
  );
};

export default PopUpItem;
