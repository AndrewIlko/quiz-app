import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { isToken } = useSelector((state) => state.user);
  const [categories, setCategories] = useState(null);
  const [banner, setBanner] = useState(false);
  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/quiz-categories")
        .then((res) => res.data)
        .then((res) => setCategories(res));
    })();
  }, []);

  return (
    <>
      <div className="main-page__wrapper">
        {!categories ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
            }}
          >
            Loading...
          </div>
        ) : (
          <div className="main-page__categories">
            {categories.map(({ categoryName, _id }) => {
              return (
                <Link
                  to={isToken ? `/quiz-categories/${_id}` : "/login"}
                  className="main-page__categories-item"
                >
                  <div>{categoryName}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
