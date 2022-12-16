import Profile from "./components/ProfileHeader/Profile";
import Header from "./components/Header";
import Main from "./components/Main";
import RegPage from "./components/RegPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Main>
    </>
  );
};

export default App;
