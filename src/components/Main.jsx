import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userActions } from "../features/userReducer";
import { getUserData } from "../server-functions/getReq.js";

const Main = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const { setData } = userActions;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      (async () => {
        const data = await getUserData();
        dispatch(setData(data));
      })();
    }
  }, []);

  return (
    <>
      <main className="main">
        <div className="wrapper">{children}</div>
      </main>
    </>
  );
};

export default Main;
