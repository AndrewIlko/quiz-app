import { useEffect, useState } from "react";
import ActiveSkin from "./ActiveSkin";
import axios from "axios";

const ListOfSkins = () => {
  const [db, setDb] = useState(null);
  //   useEffect(() => {
  //     async () => {
  //       await axios.get("");
  //     };
  //   }, []);
  return (
    <>
      <div className="active-skins__wrapper">
        <div className="active-skins">
          <ActiveSkin />
        </div>
      </div>
    </>
  );
};

export default ListOfSkins;
