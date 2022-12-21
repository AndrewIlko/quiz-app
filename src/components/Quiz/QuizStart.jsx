import { useNavigate } from "react-router-dom";

const QuizStart = ({ setIsStarted, name, quetionsCount }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="quiz__start-wrapper">
        <div className="quiz__start">
          <h2 className="quiz__start-title">Test name: "{name}"</h2>
          <div className="quiz__test-length">
            Count of quetions: {quetionsCount}
          </div>
          <div className="quiz__start-leave">
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </button>
            <button
              style={{ backgroundColor: "green" }}
              onClick={() => {
                setIsStarted(true);
              }}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizStart;
