import Logo from "./Logo";
import SearchField from "./SearchField";
import Login from "./Login";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { useSelector } from "react-redux";

const Header = () => {
  const isToken = useSelector((state) => state.user.isToken);
  return (
    <>
      <header className="header">
        <div className="wrapper">
          <div className="header__content">
            <Logo />
            {/* <SearchField /> */}
            {!isToken ? <Login /> : <ProfileHeader />}{" "}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
