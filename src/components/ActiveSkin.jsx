import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const ActiveSkin = () => {
  const [timeOnReq, setTimeOnReq] = useState(30000);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   (async () => {
    //     await axios
    //       .get(`http://localhost:5000/skin/Glock-18/Neo-Noir/Field-Tested`)
    //       .then((res) => console.log(res));
    //   })();
    // }, timeOnReq);
    // return () => clearInterval(interval);
  }, []);

  return <div className="active-skins__item"></div>;
};

export default ActiveSkin;
