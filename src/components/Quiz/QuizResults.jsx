import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QuizResults = ({ result, quetionsCount }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await axios.post(`http://localhost:5000/quiz/${id}`, { result });
    })();
  }, []);
  return (
    <>
      <div className="quiz-results__wrapper">
        <div className="quiz-results__title">Your result is </div>
        <div className="quiz-results__result">
          {result} / {quetionsCount}
        </div>
        <div className="quiz-results__navigation">
          {/* <button>Repeat</button> */}
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Return to the main page
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizResults;
