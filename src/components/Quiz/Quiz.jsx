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
        <h1>Loading...</h1>
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
          <h2>
            {testNumber + 1}/{data.quetions.length}
          </h2>
          <h3>{quetion}</h3>
          <ul
            style={{
              listStyle: "none",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "15px",
            }}
          >
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
            <button
              className="quiz__btn"
              onClick={() => {
                setSelectedOption(null);
                setTestNumber((prev) => prev + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
