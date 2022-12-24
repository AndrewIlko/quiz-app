import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import QuizOption from "./QuizOption";
import QuizResults from "./QuizResults";
import QuizStart from "./QuizStart";

const Quiz = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [correctSum, setCorrectSum] = useState(0);
  const [testNumber, setTestNumber] = useState(0);

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:5000/quiz/${id}`)
        .then((res) => res.data)
        .then((res) => setData(res));
    })();
  }, []);

  const { quetion, options, correct } = useMemo(() => {
    return {
      quetion: data?.quetions[testNumber]?.quetion,
      options: data?.quetions[testNumber]?.options,
      correct: data?.quetions[testNumber]?.correct,
    };
  }, [testNumber, data]);

  return (
    <>
      {!data ? (
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
      ) : !isStarted ? (
        <QuizStart
          setIsStarted={setIsStarted}
          name={data.testName}
          quetionsCount={data.quetions.length}
        />
      ) : testNumber == data.quetions.length ? (
        <QuizResults result={correctSum} quetionsCount={data.quetions.length} />
      ) : (
        <div className="quiz__wrapper">
          <h2 className="quiz__quetion-counter">
            Quetion {testNumber + 1}/{data.quetions.length}
          </h2>
          <h3 className="quiz__quetion-title">{quetion}</h3>
          <ul className="quiz__quetion-list">
            {options.map((option) => {
              return (
                <>
                  <QuizOption
                    title={option}
                    setCorrectSum={setCorrectSum}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    correct={correct}
                  />
                </>
              );
            })}
          </ul>
          {selectedOption && (
            <div className="quiz__btn-wrapper">
              <button
                className="quiz__btn"
                onClick={() => {
                  setSelectedOption(null);
                  setTestNumber((prev) => prev + 1);
                }}
              >
                Next
                <i className="material-icons">forward</i>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
