import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="login__wrapper">
        <button className="about-project__btn">How it works</button>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </>
  );
};

export default Login;
