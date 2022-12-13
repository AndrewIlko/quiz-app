import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../features/userReducer";

const Logout = () => {
  const { setToken } = userActions;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutProcessor = () => {
    dispatch(setToken(false));
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="login__wrapper">
        <div className="profile-avatar">?</div>
        <button
          className="login-btn"
          onClick={() => {
            logoutProcessor();
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
