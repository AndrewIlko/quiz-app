import { Link, Route, Routes } from "react-router-dom";
import AboutProjectInfo from "./AboutProjectInfo";
import ActiveSkin from "./ActiveSkin";
import ListOfSkins from "./ListOfSkins";

const Main = () => {
  return (
    <>
      <main className="main">
        <ListOfSkins />
      </main>
    </>
  );
};

export default Main;
