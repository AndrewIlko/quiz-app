import { useDispatch } from "react-redux";
import { userActions } from "../../features/userReducer";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch();
  const { setToken } = userActions;
  const navigate = useNavigate();

  const handleEvent = () => {
    dispatch(setToken(false));
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="header-profile__popup-signOut" onClick={handleEvent}>
        Sign out
      </div>
    </>
  );
};

export default SignOut;
