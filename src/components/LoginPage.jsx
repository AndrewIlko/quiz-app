import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../features/userReducer";

import ErrorFlash from "./Error.jsx/ErrorFlash";

const LoginPage = () => {
  const { setToken } = userActions;
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginProcessor = ({ token, ...data }) => {
    setIsLoading(false);
    if (token) {
      dispatch(setToken(true));
      sessionStorage.setItem("token", token);
      navigate("/");
    } else {
      setIsError(data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        loginProcessor(res.data);
      });
  };

  return (
    <>
      <div className="login-form__wrapper">
        <div className="login-form__title-wrapper">
          <h1 className="login-form__title">Sign in to Quiz App</h1>
        </div>

        {isError && <ErrorFlash message={isError} close={setIsError} />}
        <form className="login-form" onSubmit={submitHandler}>
          <div className="login-form__inputs-wrapper">
            <label htmlFor="emailLogin">Username or email address</label>
            <input
              type="email"
              id="emailLogin"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="passwordLogin">Password</label>
            <input
              type="password"
              id="passwordLogin"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            className={`login-form__btn ${
              isLoading && "login-form__btn--active"
            }`}
            value={isLoading ? "Signing in..." : "Sign in"}
          />
        </form>
        <p className="newbie-banner">
          New to Quiz App? <Link to="/registration">Create an account</Link>.
        </p>
      </div>
    </>
  );
};

export default LoginPage;
