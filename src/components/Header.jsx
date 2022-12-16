import Logo from "./Logo";
import SearchField from "./SearchField";
import Login from "./Login";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { useSelector } from "react-redux";

const Header = () => {
  const isToken = useSelector((state) => state.user.isToken);
  return (
    <>
      <div className="wrapper">
        <header className="header">
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Logo />
            <SearchField />
          </div>

          {!isToken ? <Login /> : <ProfileHeader />}
        </header>
      </div>
    </>
  );
};

export default Header;
