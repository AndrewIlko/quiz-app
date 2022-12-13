import Logo from "./Logo";
import SearchField from "./SearchField";
import Login from "./Login";
import Logout from "./Logout";
import { useSelector } from "react-redux";

const Header = () => {
  const isToken = useSelector((state) => state.user.isToken);
  return (
    <>
      <header className="header">
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Logo />
          <SearchField />
        </div>

        {!isToken ? <Login /> : <Logout />}
      </header>
    </>
  );
};

export default Header;
