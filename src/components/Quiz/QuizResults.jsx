const QuizResults = ({ result }) => {
  return (
    <>
      <div className="quiz-results__wrapper">
        <h1>Results</h1>
        <h2>{result}</h2>
      </div>
    </>
  );
};

export default QuizResults;
