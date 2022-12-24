import { useNavigate } from "react-router-dom";

const QuizStart = ({ setIsStarted, name, quetionsCount }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="quiz__start-wrapper">
        <div className="quiz__start">
          <h2 className="quiz__start-title">Test name: {name}</h2>
          <div className="quiz__test-length">
            Count of quetions: {quetionsCount}
          </div>
          <div className="quiz__start-leave">
            <button
              style={{
                backgroundColor: "rgb(207,27,36,0.5)",
                border: "1px solid rgb(207,27,36,0.6)",
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </button>
            <button
              style={{
                backgroundColor: "rgb(35, 134, 54,0.5)",
                border: "1px solid rgb(35, 134, 54,0.6)",
              }}
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
