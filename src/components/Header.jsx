import Logo from "./Logo";
import SearchField from "./SearchField";
import Login from "./Login";

const Header = () => {
  return (
    <>
      <header className="header">
        <Logo />
        <SearchField />
        <Login />
      </header>
    </>
  );
};

export default Header;
