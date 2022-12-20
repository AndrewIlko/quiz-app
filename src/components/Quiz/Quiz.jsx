import { useState } from "react";
import QuizOption from "./QuizOption";
import QuizResults from "./QuizResults";

const Quiz = () => {
  const test = [
    {
      quetion: "What was Meta Platforms Inc formerly known as?",
      options: ["Facebook", "Instagram", "Google", "Yahoo", "Youtube"],
      correct: "Facebook",
    },
    {
      quetion: "What was Meta Platforms Inc formerly known as?",
      options: ["Facebook", "Instagram", "Google", "Yahoo", "Youtube"],
      correct: "Facebook",
    },
    {
      quetion: "What was Meta Platforms Inc formerly known as?",
      options: ["Facebook", "Instagram", "Google", "Yahoo", "Youtube"],
      correct: "Facebook",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [correctSum, setCorrectSum] = useState(0);
  const [testNumber, setTestNumber] = useState(0);

  return (
    <>
      {testNumber == test.length ? (
        <QuizResults result={correctSum} />
      ) : (
        <div className="quiz__wrapper">
          <h2>
            {testNumber + 1}/{test.length}
          </h2>
          <h3>{test[testNumber].quetion}</h3>
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
            {test[testNumber].options.map((option) => {
              return (
                <>
                  <QuizOption
                    title={option}
                    setCorrectSum={setCorrectSum}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    correct={test[testNumber].correct}
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
