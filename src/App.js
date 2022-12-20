import Profile from "./components/ProfileHeader/Profile";
import Header from "./components/Header";
import Main from "./components/Main";
import RegPage from "./components/RegPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Quiz from "./components/Quiz/Quiz";

import MainPage from "./components/MainPage";

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </Main>
    </>
  );
};

export default App;
