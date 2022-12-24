import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../features/userReducer";

const QuizResults = ({ result, quetionsCount }) => {
  const dispatch = useDispatch();
  const { setBestResult } = userActions;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await axios.post(`http://localhost:5000/quiz/${id}`, {
        result,
        quetionsCount,
      });
    })();
    dispatch(setBestResult((100 / quetionsCount) * result));
  }, []);
  return (
    <>
      <div className="quiz-results__wrapper">
        <div className="quiz-results__title">Your result</div>
        <div className="quiz-results__result">
          {result} / {quetionsCount}
        </div>
        <div className="quiz-results__navigation">
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
