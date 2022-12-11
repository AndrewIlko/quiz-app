import { Link, Route, Routes } from "react-router-dom";
import AboutProjectInfo from "./AboutProjectInfo";
import ActiveSkin from "./ActiveSkin";
import ListOfSkins from "./ListOfSkins";

import axios from "axios";

const Main = () => {
  const getPosts = async () => {
    await axios
      .get("http://localhost:5000/posts", {
        headers: { authorization: sessionStorage.getItem("token") },
      })
      .then((res) => console.log(res));
  };
  return (
    <>
      <main className="main">
        <ListOfSkins />
        <button onClick={getPosts}>Get posts</button>
      </main>
    </>
  );
};

export default Main;
