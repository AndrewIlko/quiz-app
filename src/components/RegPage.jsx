import { useState } from "react";
import axios from "axios";

import ErrorFlash from "./Error.jsx/ErrorFlash";

const RegPage = () => {
  const [isError, setIsError] = useState(null);
  const [email, setEmail] = useState("");
  const [passwordMain, setPasswordMain] = useState("");
  const [passwordSecondary, setPasswordSecondary] = useState("");

  const registerUser = async (email, password) => {
    await axios
      .post("http://localhost:5000/registration", { email, password })
      .then((res) => setIsError(res.data.message));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (passwordMain != passwordSecondary) {
      setIsError("Password 1 doesnt match password 2");
      return;
    }
    if (passwordMain == passwordSecondary) {
      registerUser(email, passwordMain);
      setPasswordMain("");
      setPasswordSecondary("");
      setEmail("");
      return;
    }
  };

  return (
    <>
      <div className="login-form__wrapper">
        <div className="login-form__title-wrapper">
          <h1 className="login-form__title">Registration</h1>
        </div>
        {isError && <ErrorFlash message={isError} close={setIsError} />}
        <form className="login-form" onSubmit={submitHandler}>
          <div className="login-form__inputs-wrapper">
            <label htmlFor="emailReg">Email</label>
            <input
              type="emailReg"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password1Reg">Password</label>
            <input
              id="password1Reg"
              type="password"
              value={passwordMain}
              required
              onChange={(e) => {
                setPasswordMain(e.target.value);
              }}
            />
            <label htmlFor="">Repeat password</label>
            <input
              id="password2Reg"
              type="password"
              value={passwordSecondary}
              required
              onChange={(e) => {
                setPasswordSecondary(e.target.value);
              }}
            />
          </div>
          <input type="submit" className="login-form__btn" value={"Register"} />
        </form>
      </div>
    </>
  );
};

export default RegPage;
