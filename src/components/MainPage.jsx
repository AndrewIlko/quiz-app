import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/quiz-categories")
        .then((res) => res.data)
        .then((res) => setCategories(res));
    })();
  });
  return (
    <>
      <div className="main-page__wrapper">
        {!categories ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            Loading...
          </div>
        ) : (
          <div className="main-page__categories">
            {categories.map(({ categoryName, _id }) => {
              return (
                <Link to={`/quiz/${_id}`}>
                  <div className="main-page__categories-item">
                    {categoryName}
                  </div>
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
