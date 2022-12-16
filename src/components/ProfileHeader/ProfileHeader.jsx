import { useState } from "react";
import { useSelector } from "react-redux";
import PopUp from "./PopUp";
import PopUpItem from "./PopUpItem";
import SignOut from "./SignOut";

const ProfileHeader = () => {
  const { image, email } = useSelector((state) => state.user);
  const [popUp, setPopUp] = useState(false);

  const togglePopUp = () => {
    setPopUp((prev) => !prev);
  };
  return (
    <>
      <div className="header-profile">
        <div
          className="header-profile__icon"
          onClick={togglePopUp}
          style={{ backgroundImage: `url('${image}')` }}
        />
        {popUp && (
          <div className="header-profile__popup">
            <div className="header-profile__popup-user">
              Sing in as
              <br />
              <strong>{email}</strong>
            </div>
            <div className="divider" />
            <PopUp>
              <PopUpItem
                title={"Your profile"}
                togglePopUp={togglePopUp}
                url={"/profile"}
              />
            </PopUp>
            <div className="divider" />
            <SignOut />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
