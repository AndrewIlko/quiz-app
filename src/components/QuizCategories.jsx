import { useSelector } from "react-redux";

const QuizCategories = () => {
  const { isLoaded } = useSelector((state) => state.user);
  return (
    <>
      {isLoaded ? (
        <div>Loading...</div>
      ) : (
        <>
          <div></div>
        </>
      )}
    </>
  );
};

export default QuizCategories;
