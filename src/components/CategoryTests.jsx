import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryTests = () => {
  const { id } = useParams();
  const [tests, setTests] = useState(null);
  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:5000/quiz-categories/${id}`)
        .then((res) => res.data)
        .then((res) => {
          setTests(res);
        });
    })();
  }, []);
  console.log(tests);
  return (
    <>
      <div className="tests__wrapper">
        {tests == null ? (
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
          <>
            <div className="tests__test-wrapper">
              {tests.map(({ name, id, ...data }) => {
                return (
                  <>
                    <Link to={`/quiz/${id}`}>
                      <div className="tests__test-item">{name}</div>
                    </Link>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryTests;
