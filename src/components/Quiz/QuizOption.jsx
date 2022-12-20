const QuizOption = ({
  title,
  selectedOption,
  setSelectedOption,
  correct,
  setCorrectSum,
}) => {
  const checkOption = () => {
    if (!selectedOption) {
      return {};
    }
    if (selectedOption != title) {
      return { pointerEvents: "none" };
    }
    if (selectedOption == title && selectedOption == correct) {
      return { pointerEvents: "none", backgroundColor: "green" };
    }
    if (selectedOption == title && selectedOption != correct) {
      return { pointerEvents: "none", backgroundColor: "red" };
    }
  };
  return (
    <>
      <li
        onClick={() => {
          setSelectedOption(title);
          if (title == correct) {
            setCorrectSum((prev) => prev + 1);
          }
        }}
        className="quiz__option"
        style={checkOption()}
      >
        {title}
      </li>
    </>
  );
};

export default QuizOption;
