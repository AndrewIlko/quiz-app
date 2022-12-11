import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    // e.preventDefault();
    await axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => sessionStorage.setItem("token", res.data));
  };
  return (
    <>
      <div className="login-form__wrapper">
        <form className="login-form" onSubmit={submitHandler}>
          <h2>Hello, User</h2>
          <div className="login-form__inputs-wrapper">
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="login-form__btn">Send</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
