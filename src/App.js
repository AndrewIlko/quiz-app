import Layout from "./components/Layout";
import Header from "./components/Header";
import Main from "./components/Main";

import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<div>Register page</div>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
