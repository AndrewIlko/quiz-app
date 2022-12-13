import { Link, Route, Routes } from "react-router-dom";
import AboutProjectInfo from "./AboutProjectInfo";
import ActiveSkin from "./ActiveSkin";
import ListOfSkins from "./ListOfSkins";

import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Main = () => {
  const isToken = useSelector((state) => state.user.isToken);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (isToken) {
      (async () => {
        await axios
          .get("http://localhost:5000/posts", {
            headers: { authorization: sessionStorage.getItem("token") },
          })
          .then((res) => setPosts(res.data));
      })();
    }
  });

  return (
    <>
      <main className="main">
        <li className="posts">
          {posts.map((post) => {
            return (
              <>
                <ul className="posts__post">{post}</ul>
              </>
            );
          })}
        </li>

        {isToken ? <h3>Token is available</h3> : <h3>Token is disable</h3>}
      </main>
    </>
  );
};

export default Main;
